import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {RecoilRoot} from "recoil";
import {configureReanimatedLogger, ReanimatedLogLevel} from "react-native-reanimated";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav/>;
}

configureReanimatedLogger({
    level: ReanimatedLogLevel.error,
    strict: true, // Reanimated runs in strict mode by default
});

function RootLayoutNav() {
    const queryClient = new QueryClient();
    return (
        <GestureHandlerRootView>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <Stack>
                        <Stack.Screen name="index" options={{headerShown: false}}/>
                        <Stack.Screen name="chart" options={{headerShown: false}}/>
                        <Stack.Screen name="trade" options={{headerShown: false}}/>
                    </Stack>
                </QueryClientProvider>
            </RecoilRoot>
        </GestureHandlerRootView>
    );
}
