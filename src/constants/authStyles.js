
import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#2878F0',
  primaryDark: '#1558C0',
  navy: '#102342',
  text: '#263954',
  secondary: '#71829B',
  border: '#D8E2F0',
  background: '#FFFFFF',
  lightBlue: '#EFF5FF',
  error: '#DC2626',
};

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  branding: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 4,
  },
  tagline: {
    color: COLORS.secondary,
    fontSize: 14,
    marginTop: 4,
  },
  heading: {
    color: COLORS.navy,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.secondary,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 26,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.navy,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  primaryButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.secondary,
    fontSize: 13,
  },
  googleButton: {
    height: 54,
    borderWidth: 1,
    borderColor: '#C8D4E5',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  googleButtonText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 'auto',
    paddingTop: 12,
  },
  footerText: {
    color: COLORS.secondary,
    fontSize: 14,
  },
  footerLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
  },
});
