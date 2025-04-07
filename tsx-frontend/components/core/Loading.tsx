import { GlobalStyle } from '@/components/core/GlobalStyle';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const Loading = () => {
  return (
    <ThemedView style={GlobalStyle.RootContainer}>
      <ThemedText type="title">Loading ... </ThemedText>
    </ThemedView>
  )
}

export default Loading