import { AnalysisPage } from "@/presentation/pages";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnalysisScreen() {
  return (
    <SafeAreaView className='flex-1'>
      <AnalysisPage />
    </SafeAreaView>
  );
}
