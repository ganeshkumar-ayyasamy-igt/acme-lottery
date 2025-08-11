import { moderateScale } from 'react-native-size-matters';

export const typography = {
  heading: {
    fontSize: moderateScale(24),
    fontWeight: 'bold' as const,
  },
  subheading: {
    fontSize: moderateScale(18),
    fontWeight: '600' as const,
  },
  body: {
    fontSize: moderateScale(14),
    fontWeight: '400' as const,
  },
  fontBold: {
    fontWeight: 'bold' as const,
  },
};
