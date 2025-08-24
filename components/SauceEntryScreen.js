// SauceEntryScreen.js – Fully Upgraded 🌶️
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { userMap } from '../lib/dave';

import { ChipGroup } from './chip';
import { useHeatColor } from './helpers';
import { SectionCard } from './SectionCard';
import { StickySubmit } from './StickySubmit';
import { theme } from './theme';

const VALIDATION_RULES = {
  MAX_SCOVILLE: 16000000,
  MIN_RATIO: 0.0,
  MAX_RATIO: 1.0,
  URL_DEBOUNCE_MS: 300,
};

const SAUCE_OPTIONS = {
  garlic: ['low', 'med', 'high'],
  crispSources: [
    'garlic',
    'onion',
    'peanut',
    'pumpkin-seed',
    'sesame',
    'sauce-texture',
    'none',
    'other',
    'tortilla-chip',
  ],
  crispLevels: ['light', 'medium', 'heavy'],
  smokiness: ['none', 'light', 'medium', 'strong'],
};

const crispSourceHints = {
  none: '',
  'tortilla-chip': 'Think restaurant salsa crunch',
  'pumpkin-seed': 'Classic salsa macha style',
  sesame: 'Toasty and nutty crunch',
  garlic: 'Crispy confit edge',
  onion: 'Fried shallot or crisped onion bits',
};

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

const validateSauceForm = ({ heat, oilSeedRatio, urlError }) => {
  if (!heat?.trim()) return { field: 'heat', message: 'Scoville heat is required' };
  const h = parseInt(heat, 10);
  if (isNaN(h) || h < 0 || h > VALIDATION_RULES.MAX_SCOVILLE || heat.includes('.')) {
    return { field: 'heat', message: 'Enter whole number between 0–16,000,000' };
  }

  if (!oilSeedRatio?.trim()) return { field: 'ratio', message: 'Oil-seed ratio required' };
  const r = parseFloat(oilSeedRatio);
  if (isNaN(r) || r < 0 || r > 1) {
    return { field: 'ratio', message: 'Ratio must be 0.0–1.0' };
  }

  if (urlError) return { field: 'url', message: urlError };
  return null;
};

export default function SauceEntryScreen() {
  const [sauceName, setSauceName] = useState('');
  const [heat, setHeat] = useState('');
  const [garlic, setGarlic] = useState('med');
  const [crispSource, setCrispSource] = useState('sauce-texture');
  const [crispLevel, setCrispLevel] = useState('medium');
  const [smokiness, setSmokiness] = useState('none');
  const [oilSeedRatio, setOilSeedRatio] = useState('');
  const [ingredientURL, setIngredientURL] = useState('');
  const [urlError, setUrlError] = useState('');

  const heatAnim = useRef(new Animated.Value(0)).current;
  const getHeatColor = useHeatColor();

  useEffect(() => {
    const val = Math.min(1, Math.max(0, parseInt(heat || '0', 10) / 16000000));
    Animated.timing(heatAnim, {
      toValue: val,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [heat]);

  const resetForm = () => {
    setSauceName('');
    setHeat('');
    setGarlic('med');
    setCrispSource('sauce-texture');
    setCrispLevel('medium');
    setSmokiness('none');
    setOilSeedRatio('');
    setIngredientURL('');
    setUrlError('');
  };

  const validateUrlDebounced = useCallback(
    debounce((url) => {
      if (!url) return;
      const trimmed = url.trim();
      const isValid = trimmed.startsWith('http') && validateUrl(trimmed);
      setUrlError(isValid ? '' : 'Invalid URL');
    }, VALIDATION_RULES.URL_DEBOUNCE_MS),
    [],
  );

  useEffect(() => {
    return () => {
      validateUrlDebounced.cancel?.();
    };
  }, [validateUrlDebounced]);

  const handleSubmit = async () => {
    const validation = validateSauceForm({ heat, oilSeedRatio, urlError });
    if (validation) return Alert.alert('Validation Error', validation.message);

    const data = {
      sauceName: sauceName.trim() || null,
      heat: parseInt(heat, 10),
      garlic,
      crispSource,
      crispLevel: crispSource === 'none' ? 'light' : crispLevel,
      smokiness,
      oilSeedRatio: parseFloat(oilSeedRatio),
      ingredientURL: (() => {
        const trimmed = ingredientURL.trim();
        return trimmed.startsWith('http') && validateUrl(trimmed) ? trimmed : null;
      })(),
      timestamp: new Date().toISOString(),
      version: '1.0',
    };

    try {
      await userMap.set(data);
      resetForm();
      Alert.alert('Success', 'Sauce logged!');
    } catch (err) {
      Alert.alert('Chain Error', 'Network busy, try again');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ padding: theme.space.lg, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        <SectionCard title="Name">
          <TextInput
            value={sauceName}
            onChangeText={setSauceName}
            placeholder="e.g. Macha Inferno"
            style={inputStyle}
          />
        </SectionCard>

        <SectionCard title="Heat">
          <TextInput
            value={heat}
            onChangeText={setHeat}
            placeholder="e.g. 8000"
            keyboardType="number-pad"
            style={inputStyle}
          />
          <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
            Typical: Mild &lt;5k, Medium 5k–50k, Hot 50k+
          </Text>
          <View
            style={{
              height: 8,
              backgroundColor: theme.colors.surfaceAlt,
              borderRadius: 999,
              overflow: 'hidden',
              marginTop: 6,
            }}
          >
            <Animated.View
              style={{
                height: '100%',
                width: heatAnim.interpolate({ inputRange: [0, 1], outputRange: ['2%', '100%'] }),
                backgroundColor: getHeatColor(heat),
              }}
            />
          </View>
        </SectionCard>

        <SectionCard title="Flavor">
          <ChipGroup
            label="Garlic Intensity"
            options={SAUCE_OPTIONS.garlic}
            value={garlic}
            onChange={setGarlic}
          />
          <ChipGroup
            label="Smokiness Level"
            options={SAUCE_OPTIONS.smokiness}
            value={smokiness}
            onChange={setSmokiness}
          />
        </SectionCard>

        <SectionCard title="Texture">
          <ChipGroup
            label="Crunch Source"
            options={SAUCE_OPTIONS.crispSources}
            value={crispSource}
            onChange={setCrispSource}
          />
          <ChipGroup
            label="Crunch Level"
            options={SAUCE_OPTIONS.crispLevels}
            value={crispLevel}
            onChange={setCrispLevel}
            disabled={crispSource === 'none'}
            hint={crispSourceHints[crispSource]}
          />
        </SectionCard>

        <SectionCard title="Ratio">
          <TextInput
            value={oilSeedRatio}
            onChangeText={setOilSeedRatio}
            placeholder="0.0–1.0"
            keyboardType="decimal-pad"
            style={inputStyle}
          />
        </SectionCard>

        <SectionCard title="Ingredient Link">
          <TextInput
            value={ingredientURL}
            onChangeText={(url) => {
              setIngredientURL(url);
              setUrlError('');
              validateUrlDebounced(url);
            }}
            placeholder="https://..."
            style={[inputStyle, urlError ? { borderColor: theme.colors.error } : null]}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {!!urlError && (
            <Text style={{ color: theme.colors.error, fontSize: 12 }}>{urlError}</Text>
          )}
        </SectionCard>
      </ScrollView>
      <StickySubmit disabled={!heat || urlError} onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: theme.colors.outline,
  padding: 10,
  marginBottom: 16,
  borderRadius: theme.radii.md,
  backgroundColor: theme.colors.surfaceAlt,
  color: theme.colors.text,
};
