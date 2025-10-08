import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Toast } from "toastify-react-native";

import Card from "../Card";

interface ReceiptUploadProps {
  onFileSelected?: (file: any) => void;
  selectedFile: any;
}

export function ReceiptUpload({ onFileSelected, selectedFile }: ReceiptUploadProps) {

  const pickImageFromGallery = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permissão negada",
          "Precisamos de permissão para acessar sua galeria"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets[0]) {
        const file = {
          uri: result.assets[0].uri,
          type: result.assets[0].type || "image",
          name: result.assets[0].fileName || "image.jpg",
        };
        onFileSelected?.(file);

        Toast.show({
          autoHide: true,
          text1: "Imagem selecionada com sucesso!",
          type: "success",
        });
      }
    } catch (error) {
      Toast.show({
        autoHide: true,
        text1: "Erro ao selecionar imagem",
        type: "error",
      });
    }
  };

  const takePhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permissão negada",
          "Precisamos de permissão para acessar sua câmera"
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const file = {
          uri: result.assets[0].uri,
          type: result.assets[0].type || "image",
          name: result.assets[0].fileName || "photo.jpg",
        };
        onFileSelected?.(file);

        Toast.show({
          autoHide: true,
          text1: "Foto capturada com sucesso!",
          type: "success",
        });
      }
    } catch (error) {
      Toast.show({
        autoHide: true,
        text1: "Erro ao capturar foto",
        type: "error",
      });
    }
  };

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = {
          uri: result.assets[0].uri,
          type: "application/pdf",
          name: result.assets[0].name,
          size: result.assets[0].size,
        };
        onFileSelected?.(file);

        Toast.show({
          autoHide: true,
          text1: "PDF selecionado com sucesso!",
          type: "success",
        });
      }
    } catch (error) {
      Toast.show({
        autoHide: true,
        text1: "Erro ao selecionar PDF",
        type: "error",
      });
    }
  };

  const removeFile = () => {
    onFileSelected?.(null);
    Toast.show({
      autoHide: true,
      text1: "Arquivo removido",
      type: "info",
    });
  };

  const isImage =
    selectedFile?.type?.startsWith("image/") || selectedFile?.type === "image";
  const isPDF = selectedFile?.type === "application/pdf";

  return (
    <Card className="shadow-black/20 py-3">
      <View className="flex-row items-center mb-6">
        <Ionicons name="receipt-outline" size={24} color="#28B2AA" />
        <Text className="ml-2 text-lg font-nunito-semi-bold text-neutral-900">
          Upload de recibo
        </Text>
      </View>

      {/* Arquivo selecionado */}
      {selectedFile && (
        <View className="mb-6 p-4 bg-neutral-50 border border-neutral-200 rounded-md">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-nunito-medium text-neutral-700">
              Arquivo selecionado:
            </Text>
            <TouchableOpacity onPress={removeFile} className="p-1">
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {isImage && (
            <Image
              source={{ uri: selectedFile.uri }}
              className="w-full h-32 rounded-md mb-2"
              resizeMode="cover"
            />
          )}

          {isPDF && (
            <View className="flex-row items-center justify-center py-8 bg-neutral-100 rounded-md mb-2">
              <Ionicons name="document-text-outline" size={32} color="#666" />
              <Text className="ml-2 text-neutral-700 font-nunito-medium">
                PDF
              </Text>
            </View>
          )}

          <Text className="text-xs text-neutral-600 text-center">
            {selectedFile.name}
          </Text>
          {selectedFile.size && (
            <Text className="text-xs text-neutral-500 text-center">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </Text>
          )}
        </View>
      )}

      {/* Botões de upload */}
      <View className="space-y-3 flex gap-2">
        <TouchableOpacity
          onPress={pickImageFromGallery}
          className="flex-row items-center justify-center py-3 px-4 bg-white border border-neutral-300 rounded-md"
        >
          <Ionicons name="image-outline" size={20} color="#666" />
          <Text className="ml-2 text-neutral-700 font-nunito-medium">
            Selecionar da galeria
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={takePhoto}
          className="flex-row items-center justify-center py-3 px-4 bg-white border border-neutral-300 rounded-md"
        >
          <Ionicons name="camera-outline" size={20} color="#666" />
          <Text className="ml-2 text-neutral-700 font-nunito-medium">
            Tirar foto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={pickPDF}
          className="flex-row items-center justify-center py-3 px-4 bg-white border border-neutral-300 rounded-md"
        >
          <Ionicons name="document-text-outline" size={20} color="#666" />
          <Text className="ml-2 text-neutral-700 font-nunito-medium">
            Selecionar PDF
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dica */}
      <View className="mt-4 p-3 bg-neutral-50 border border-neutral-200 rounded-md">
        <View className="flex-row items-start">
          <Ionicons name="information-circle-outline" size={16} color="#666" />
          <Text className="ml-2 text-xs text-neutral-600 flex-1">
            Formatos aceitos: PNG, JPEG e PDF. Tamanho máximo: 10MB
          </Text>
        </View>
      </View>
    </Card>
  );
}
