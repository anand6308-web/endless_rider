import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/appStore';
import { updateUserProfile } from '../../utils/database';
import { t, LocaleCode } from '../../constants/i18n';

export default function SettingsScreen() {
  const { userProfile, setUserProfile, setCurrentLocale } = useAppStore();
  const locale = (userProfile?.locale || 'en-US') as LocaleCode;
  
  const [textSize, setTextSize] = useState(userProfile?.textSize || 'normal');
  const [highContrast, setHighContrast] = useState(userProfile?.highContrast || false);
  const [voiceMode, setVoiceMode] = useState(userProfile?.voiceMode || false);
  const [notifications, setNotifications] = useState(userProfile?.notificationsEnabled || true);

  const handleSettingChange = async (key: string, value: any) => {
    if (!userProfile) return;

    try {
      const updates = { [key]: value };
      await updateUserProfile(userProfile.userId, updates);
      
      setUserProfile({
        ...userProfile,
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      Alert.alert('Error', 'Failed to update settings');
    }
  };

  const handleLocaleChange = (newLocale: LocaleCode) => {
    handleSettingChange('locale', newLocale);
    setCurrentLocale(newLocale);
  };

  const handleTextSizeChange = (size: string) => {
    setTextSize(size);
    handleSettingChange('textSize', size);
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Export functionality will be available in a future update.',
      [{ text: 'OK' }]
    );
  };

  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Data',
      'Are you sure you want to delete all your data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement data deletion
            Alert.alert('Success', 'Data deletion will be implemented soon');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('nav.settings', locale)}</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>

        {/* Accessibility Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.accessibility', locale)}</Text>
          
          {/* Text Size */}
          <View style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <Ionicons name="text" size={24} color="#6366f1" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{t('settings.textSize', locale)}</Text>
                <Text style={styles.settingDescription}>Adjust text size for better readability</Text>
              </View>
            </View>
            <View style={styles.textSizeOptions}>
              {['normal', 'large', 'extra_large'].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.textSizeButton,
                    textSize === size && styles.textSizeButtonActive,
                  ]}
                  onPress={() => handleTextSizeChange(size)}
                >
                  <Text
                    style={[
                      styles.textSizeButtonText,
                      textSize === size && styles.textSizeButtonTextActive,
                    ]}
                  >
                    {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* High Contrast */}
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <Ionicons name="contrast" size={24} color="#6366f1" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{t('settings.highContrast', locale)}</Text>
                <Text style={styles.settingDescription}>Increase contrast for visibility</Text>
              </View>
              <Switch
                value={highContrast}
                onValueChange={(value) => {
                  setHighContrast(value);
                  handleSettingChange('highContrast', value);
                }}
                trackColor={{ false: '#334155', true: '#6366f1' }}
                thumbColor={highContrast ? '#ffffff' : '#94a3b8'}
              />
            </View>
          </View>

          {/* Voice Mode */}
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <Ionicons name="mic" size={24} color="#6366f1" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{t('settings.voiceMode', locale)}</Text>
                <Text style={styles.settingDescription}>Read prompts and voice input</Text>
              </View>
              <Switch
                value={voiceMode}
                onValueChange={(value) => {
                  setVoiceMode(value);
                  handleSettingChange('voiceMode', value);
                }}
                trackColor={{ false: '#334155', true: '#6366f1' }}
                thumbColor={voiceMode ? '#ffffff' : '#94a3b8'}
              />
            </View>
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.language', locale)}</Text>
          
          <View style={styles.settingCard}>
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => handleLocaleChange('en-US')}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>English (US)</Text>
                <Text style={styles.languageNative}>English (United States)</Text>
              </View>
              {locale === 'en-US' && (
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              )}
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => handleLocaleChange('en-IN')}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>English (India)</Text>
                <Text style={styles.languageNative}>English (India)</Text>
              </View>
              {locale === 'en-IN' && (
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              )}
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => handleLocaleChange('te-IN')}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>తెలుగు</Text>
                <Text style={styles.languageNative}>Telugu</Text>
              </View>
              {locale === 'te-IN' && (
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.notifications', locale)}</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <Ionicons name="notifications" size={24} color="#6366f1" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Daily Reminders</Text>
                <Text style={styles.settingDescription}>Get reminded to practice daily</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={(value) => {
                  setNotifications(value);
                  handleSettingChange('notificationsEnabled', value);
                }}
                trackColor={{ false: '#334155', true: '#6366f1' }}
                thumbColor={notifications ? '#ffffff' : '#94a3b8'}
              />
            </View>
          </View>
        </View>

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity style={styles.actionCard} onPress={handleExportData}>
            <Ionicons name="download-outline" size={24} color="#6366f1" />
            <View style={styles.actionInfo}>
              <Text style={styles.actionLabel}>{t('settings.exportData', locale)}</Text>
              <Text style={styles.actionDescription}>Download your training data</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCardDanger} onPress={handleDeleteData}>
            <Ionicons name="trash-outline" size={24} color="#ef4444" />
            <View style={styles.actionInfo}>
              <Text style={[styles.actionLabel, { color: '#ef4444' }]}>
                {t('settings.deleteData', locale)}
              </Text>
              <Text style={styles.actionDescription}>Permanently remove all data</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Morning Memory Gym v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2026 Memory Training App</Text>
          <Text style={styles.disclaimerText}>
            This is a training app, not a medical device. Results shown are training performance
            metrics only.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  settingCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#94a3b8',
  },
  textSizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSizeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#334155',
  },
  textSizeButtonActive: {
    borderColor: '#6366f1',
    backgroundColor: '#312e81',
  },
  textSizeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  textSizeButtonTextActive: {
    color: '#ffffff',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  languageNative: {
    fontSize: 13,
    color: '#94a3b8',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 4,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  actionCardDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#7f1d1d',
  },
  actionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 13,
    color: '#94a3b8',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  appInfoText: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#475569',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 24,
    lineHeight: 16,
  },
});
