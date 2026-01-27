from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from bson import ObjectId

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Custom PyObjectId to handle MongoDB ObjectIds
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, _schema_generator, _handler) -> dict:
        return {"type": "string"}

# Pydantic Models for API
class UserProfile(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_id: str
    locale: str = "en-US"
    selected_track: str = "numbers"
    daily_time: int = 5  # minutes
    voice_mode: bool = False
    text_size: str = "normal"  # normal, large, extra_large
    high_contrast: bool = False
    notifications_enabled: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class SkillProfile(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_id: str
    number_recall_score: float = 0.0
    name_face_score: float = 0.0
    focus_score: float = 0.0
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class Attempt(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_id: str
    exercise_id: str
    item_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    result: bool  # success or failure
    response_time_ms: int
    difficulty_snapshot: Dict[str, Any]
    score: Optional[float] = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class ReviewSchedule(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_id: str
    item_id: str
    exercise_id: str
    next_due_at: datetime
    ease_factor: float = 2.5
    interval: int = 1  # days
    repetitions: int = 0
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class ExerciseDefinition(BaseModel):
    id: str
    name: str
    type: str  # "number_recall", "name_face", "focus_switch"
    params: Dict[str, Any]
    scoring: Dict[str, Any]
    scheduling: Dict[str, Any]
    min_app_version: str = "1.0.0"
    version: str = "1.0.0"

class ContentPack(BaseModel):
    id: str
    locale: str
    version: str
    assets: Dict[str, Any]
    items: Dict[str, Any]

# API Endpoints
@api_router.get("/")
async def root():
    return {"message": "Morning Memory Gym API", "version": "1.0.0"}

# User Profile endpoints
@api_router.post("/user-profile", response_model=UserProfile)
async def create_user_profile(profile: UserProfile):
    profile_dict = profile.dict(by_alias=True, exclude={"id"})
    result = await db.user_profiles.insert_one(profile_dict)
    profile_dict["_id"] = str(result.inserted_id)
    return UserProfile(**profile_dict)

@api_router.get("/user-profile/{user_id}", response_model=UserProfile)
async def get_user_profile(user_id: str):
    profile = await db.user_profiles.find_one({"user_id": user_id})
    if not profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    profile["_id"] = str(profile["_id"])
    return UserProfile(**profile)

@api_router.put("/user-profile/{user_id}", response_model=UserProfile)
async def update_user_profile(user_id: str, profile: UserProfile):
    profile_dict = profile.dict(by_alias=True, exclude={"id", "user_id", "created_at"})
    profile_dict["updated_at"] = datetime.utcnow()
    result = await db.user_profiles.update_one(
        {"user_id": user_id},
        {"$set": profile_dict}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User profile not found")
    updated_profile = await db.user_profiles.find_one({"user_id": user_id})
    updated_profile["_id"] = str(updated_profile["_id"])
    return UserProfile(**updated_profile)

# Skill Profile endpoints
@api_router.post("/skill-profile", response_model=SkillProfile)
async def create_skill_profile(skill: SkillProfile):
    skill_dict = skill.dict(by_alias=True, exclude={"id"})
    result = await db.skill_profiles.insert_one(skill_dict)
    skill_dict["_id"] = str(result.inserted_id)
    return SkillProfile(**skill_dict)

@api_router.get("/skill-profile/{user_id}", response_model=SkillProfile)
async def get_skill_profile(user_id: str):
    skill = await db.skill_profiles.find_one({"user_id": user_id})
    if not skill:
        raise HTTPException(status_code=404, detail="Skill profile not found")
    skill["_id"] = str(skill["_id"])
    return SkillProfile(**skill)

@api_router.put("/skill-profile/{user_id}", response_model=SkillProfile)
async def update_skill_profile(user_id: str, skill: SkillProfile):
    skill_dict = skill.dict(by_alias=True, exclude={"id", "user_id"})
    skill_dict["updated_at"] = datetime.utcnow()
    result = await db.skill_profiles.update_one(
        {"user_id": user_id},
        {"$set": skill_dict}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Skill profile not found")
    updated_skill = await db.skill_profiles.find_one({"user_id": user_id})
    updated_skill["_id"] = str(updated_skill["_id"])
    return SkillProfile(**updated_skill)

# Attempt endpoints
@api_router.post("/attempts", response_model=Attempt)
async def create_attempt(attempt: Attempt):
    attempt_dict = attempt.dict(by_alias=True, exclude={"id"})
    result = await db.attempts.insert_one(attempt_dict)
    attempt_dict["_id"] = str(result.inserted_id)
    return Attempt(**attempt_dict)

@api_router.get("/attempts/{user_id}", response_model=List[Attempt])
async def get_user_attempts(user_id: str, limit: int = 100):
    attempts = await db.attempts.find({"user_id": user_id}).sort("timestamp", -1).limit(limit).to_list(length=limit)
    for attempt in attempts:
        attempt["_id"] = str(attempt["_id"])
    return [Attempt(**attempt) for attempt in attempts]

# Review Schedule endpoints
@api_router.post("/review-schedule", response_model=ReviewSchedule)
async def create_review_schedule(schedule: ReviewSchedule):
    schedule_dict = schedule.dict(by_alias=True, exclude={"id"})
    result = await db.review_schedules.insert_one(schedule_dict)
    schedule_dict["_id"] = str(result.inserted_id)
    return ReviewSchedule(**schedule_dict)

@api_router.get("/review-schedule/{user_id}/due")
async def get_due_reviews(user_id: str):
    now = datetime.utcnow()
    schedules = await db.review_schedules.find({
        "user_id": user_id,
        "next_due_at": {"$lte": now}
    }).to_list(length=100)
    for schedule in schedules:
        schedule["_id"] = str(schedule["_id"])
    return [ReviewSchedule(**schedule) for schedule in schedules]

@api_router.put("/review-schedule/{schedule_id}", response_model=ReviewSchedule)
async def update_review_schedule(schedule_id: str, schedule: ReviewSchedule):
    schedule_dict = schedule.dict(by_alias=True, exclude={"id"})
    schedule_dict["updated_at"] = datetime.utcnow()
    result = await db.review_schedules.update_one(
        {"_id": ObjectId(schedule_id)},
        {"$set": schedule_dict}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Review schedule not found")
    updated_schedule = await db.review_schedules.find_one({"_id": ObjectId(schedule_id)})
    updated_schedule["_id"] = str(updated_schedule["_id"])
    return ReviewSchedule(**updated_schedule)

# Content Pack endpoints
@api_router.get("/content-packs")
async def get_content_packs(locale: Optional[str] = None):
    query = {"locale": locale} if locale else {}
    packs = await db.content_packs.find(query).to_list(length=100)
    for pack in packs:
        if "_id" in pack:
            pack["_id"] = str(pack["_id"])
    return packs

@api_router.get("/content-packs/{pack_id}")
async def get_content_pack(pack_id: str):
    pack = await db.content_packs.find_one({"id": pack_id})
    if not pack:
        raise HTTPException(status_code=404, detail="Content pack not found")
    if "_id" in pack:
        pack["_id"] = str(pack["_id"])
    return pack

# Exercise Definition endpoints
@api_router.get("/exercise-definitions")
async def get_exercise_definitions():
    exercises = await db.exercise_definitions.find().to_list(length=100)
    for exercise in exercises:
        if "_id" in exercise:
            exercise["_id"] = str(exercise["_id"])
    return exercises

@api_router.get("/exercise-definitions/{exercise_id}")
async def get_exercise_definition(exercise_id: str):
    exercise = await db.exercise_definitions.find_one({"id": exercise_id})
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise definition not found")
    if "_id" in exercise:
        exercise["_id"] = str(exercise["_id"])
    return exercise

# Health check
@api_router.get("/health")
async def health_check():
    try:
        await db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
