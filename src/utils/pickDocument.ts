import * as DocumentPicker from "expo-document-picker";

export const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const fileAsset = result.assets[0];

        const fileUri = fileAsset.uri;
        const fileName = fileAsset.name || fileUri.split("/").pop();

        const fileType = fileAsset.mimeType || "application/octet-stream";

        const fileToUpload = {
          uri: fileUri,
          name: fileName,
          type: fileType,
          // No Android, o URI geralmente começa com 'content://' e precisa
          // ser corrigido para 'file://' para que o FormData funcione corretamente
          // em algumas versões mais antigas ou certas bibliotecas de upload (ex: Axios).
          // Se a sua API falhar, tente adicionar esta correção:
          // uri: Platform.OS === 'android' ? fileUri.replace('file://', '') : fileUri,
        };

        console.log({ fileToUpload });

        return fileToUpload;
      }

      return null;
    } catch (err) {
      console.log("Erro ao selecionar o documento:", err);
      return null;
    }
  };
