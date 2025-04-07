import { TextInput,  StyleSheet, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'noOtherType...';
};

export function ThemedTextInput({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedTextInputProps) {
  const color           = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: '#2e2e2e' }, 'background');
  return (
    <TextInput style={[ { color, backgroundColor },styles.default, style, ]} {...rest} />
  );
}

const styles = StyleSheet.create({
  default: {

  },
});
