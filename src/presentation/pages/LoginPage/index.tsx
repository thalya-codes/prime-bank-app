import Button from "@/presentation/components/Button";
import { CardHighlight } from "@/presentation/components/CardHighlight";
import { FormFieldLabel } from "@/presentation/components/FormField/FormFieldLabel";
import { FormFieldMessage } from "@/presentation/components/FormField/FormFieldMessage";
import { FormFieldRoot } from "@/presentation/components/FormField/FormFieldRoot";
import { InputField, InputIcon, InputRoot } from "@/presentation/components/Input";
import { InputPassword } from "@/presentation/components/InputPassword";
import { ICredentials, useAuth } from "@/presentation/hooks/useAuth";
import { PublicScreenLayout } from "@/presentation/layouts/PublicScreenLayout";
import { getToken } from "@/utils/auth/secureStore";
import { emailSchema } from "@/utils/validations";
import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
// import Toast from "react-native-toast-message";
import { Toast } from "toastify-react-native";
import * as yup from "yup";

const loginSchema = yup
  .object({
    password: yup.string().required("O campo é obrigatório!"),
  })
  .concat(emailSchema);

export function LoginPage() {
  const router = useRouter();
  const { signIn, handleAuthError } = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onLogin = async (credentials: ICredentials) => {
    try {
      await signIn(credentials);
      const token = await getToken(process.env.EXPO_PUBLIC_TOKEN_KEY!);
      console.log({ key: process.env.EXPO_PUBLIC_TOKEN_KEY, token });
      router.push("/home");
    } catch (error) {
      const errorMessage = handleAuthError(error);
      Toast.show({
        type: "error",
        autoHide: false,
        text1: errorMessage,
      });
    } finally {
    }
    // @ts-ignore - Ignorando erros de tipo para fins de demonstração
  };

  return (
    <PublicScreenLayout
      title='Bem vindo(a)'
      subTitle='Acesse sua conta Prime Bank'
      footer={
        <View className='gap-8'>
          <View className='flex-row items-center justify-center w-full gap-1'>
            <Text className='text-xl font-nunito-regular text-neutral-800'>
              Não tem uma conta?
            </Text>
            <Button
              variant='link'
              text='Criar conta'
              isFullWidth={false}
              textClassName='font-inter-bold'
              onPress={() => router.navigate("/create-account")}
            />
          </View>

          <View className='flex-row justify-between'>
            <CardHighlight iconName={"lock"} text={"100% Seguro"} />
            <CardHighlight
              iconName={"envelope-o"}
              iconSize={16}
              text={"Suporte 24h"}
            />
          </View>
        </View>
      }
    >
      <Controller
        name='email'
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <FormFieldRoot>
            <FormFieldLabel>Email</FormFieldLabel>
            <InputRoot>
              <InputIcon name='envelope-o' />
              <InputField
                placeholder='Digite seu email'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                {...field}
              />
            </InputRoot>
            {errors?.email && (
              <FormFieldMessage isError>
                {errors.email.message}
              </FormFieldMessage>
            )}
          </FormFieldRoot>
        )}
      />

      <FormFieldRoot>
        <FormFieldLabel>Senha</FormFieldLabel>
        <InputPassword
          control={control}
          name='password'
          error={errors?.password}
        />
      </FormFieldRoot>

      <Button text='Entrar' className='gap-2' onPress={handleSubmit(onLogin)}>
        <AntDesign name='arrowright' size={20} color={"#fff"} />
      </Button>

      {/* <Button
        variant='link'
        text='Esqueci minha senha'
        onPress={() => router.push("/(auth)/forgot-password")}
      /> */}
    </PublicScreenLayout>
  );
}

