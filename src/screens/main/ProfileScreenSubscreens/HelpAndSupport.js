
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@react-native-vector-icons/ionicons';

const faqs = [
  {
    id: '1',
    question: 'How do I create a workout routine?',
    answer:
      'Go to the Workouts section, tap on Create Routine, add your preferred exercises, configure sets and reps, and save your routine.',
  },
  {
    id: '2',
    question: 'How can I track my workout progress?',
    answer:
      'FitLink automatically saves your completed workout sessions. Visit your History section to review your previous workouts and training details.',
  },
  {
    id: '3',
    question: 'Can I edit or delete my workout routines?',
    answer:
      'Yes! Open the Workouts section, select the routine you want to manage, and use the available edit or delete options.',
  },
  {
    id: '4',
    question: 'Where can I see my workout history?',
    answer:
      'Open the History section from the app to view your previously completed workout sessions.',
  },
  {
    id: '5',
    question: 'How can I update my profile?',
    answer:
      'Visit your Profile section to view your account information and update your personal details where editing is available.',
  },
];

export default function HelpAndSupport({ navigation }) {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'For assistance, please contact our support team at support@fitlink.com',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Email Us',
          onPress: () =>
            Linking.openURL('mailto:support@fitlink.com'),
        },
      ]
    );
  };

  const handleFeedback = () => {
    Alert.alert(
      'Send Feedback',
      'Thank you for helping us improve FitLink!',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color="#172343" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Help & Support</Text>

        <View style={{ width: 42 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Support Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Ionicons
              name="headset-outline"
              size={36}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.bannerTitle}>
            How can we help you?
          </Text>

          <Text style={styles.bannerDescription}>
            Find answers to common questions or get in touch with our
            support team.
          </Text>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Frequently Asked Questions
          </Text>

          {faqs.map((faq) => {
            const isExpanded = expandedFaq === faq.id;

            return (
              <TouchableOpacity
                key={faq.id}
                activeOpacity={0.8}
                style={styles.faqCard}
                onPress={() =>
                  setExpandedFaq(isExpanded ? null : faq.id)
                }
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>
                    {faq.question}
                  </Text>

                  <Ionicons
                    name={
                      isExpanded
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    size={20}
                    color="#64748B"
                  />
                </View>

                {isExpanded && (
                  <Text style={styles.faqAnswer}>
                    {faq.answer}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Still Need Help?
          </Text>

          <TouchableOpacity
            style={styles.supportCard}
            onPress={handleContactSupport}
          >
            <View style={styles.supportIcon}>
              <Ionicons
                name="mail-outline"
                size={24}
                color="#2563EB"
              />
            </View>

            <View style={styles.supportInfo}>
              <Text style={styles.supportTitle}>
                Email Support
              </Text>
              <Text style={styles.supportDescription}>
                Get assistance from our support team
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#94A3B8"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.supportCard}
            onPress={handleFeedback}
          >
            <View style={styles.supportIcon}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="#2563EB"
              />
            </View>

            <View style={styles.supportInfo}>
              <Text style={styles.supportTitle}>
                Send Feedback
              </Text>
              <Text style={styles.supportDescription}>
                Share your ideas and suggestions
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#94A3B8"
            />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons
            name="fitness-outline"
            size={25}
            color="#2563EB"
          />

          <Text style={styles.footerTitle}>FitLink Support</Text>

          <Text style={styles.footerDescription}>
            We're here to make your fitness journey better.
          </Text>

          <Text style={styles.footerVersion}>
            FitLink v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172343',
  },

  banner: {
    backgroundColor: '#2563EB',
    margin: 18,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
  },

  bannerIcon: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  bannerTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  bannerDescription: {
    fontSize: 13,
    lineHeight: 21,
    color: '#DBEAFE',
    textAlign: 'center',
    marginTop: 9,
  },

  section: {
    marginHorizontal: 18,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172343',
    marginBottom: 14,
  },

  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },

  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#172343',
    marginRight: 12,
  },

  faqAnswer: {
    fontSize: 13,
    lineHeight: 21,
    color: '#64748B',
    marginTop: 13,
  },

  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 11,
  },

  supportIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  supportInfo: {
    flex: 1,
  },

  supportTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#172343',
  },

  supportDescription: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 25,
    marginBottom: 15,
  },

  footerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#172343',
    marginTop: 8,
  },

  footerDescription: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 5,
  },

  footerVersion: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 12,
  },
});
