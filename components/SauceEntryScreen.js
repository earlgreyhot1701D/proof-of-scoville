// SauceEntryScreen.js – Feature Complete for Checkpoint 2 🌶️

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
import { useHeatColor } from './heathelpers';
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

function normalizeUrl(rawUrl) {
  if (!rawUrl) return '';
  let trimmed = rawUrl.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = 'https://' + trimmed;
  }
  return trimmed;
}

const validateSauceForm = ({ heat, oilSeedRatio, urlError, ingredientURL, isVerifiedSource }) => {
  if (!heat?.trim()) return { field: 'heat', message: 'Scoville heat is required' };
  const h = parseInt(heat, 10);
  if (isNaN(h) || h < 0 || h > VALIDATION_RULES.MAX_SCOVILLE || heat.includes('.')) {
    return { field: 'heat', message: 'Enter whole number between 0–16,000,000' };
  }

  if (!oilSeedRatio?.trim()) return { field: 'ratio', message: 'Oil-seed ratio required' };
  const r = parseFloat(oilSeedRatio);
  if (isNaN(r) || r < VALIDATION_RULES.MIN_RATIO || r > VALIDATION_RULES.MAX_RATIO) {
    return { field: 'ratio', message: 'Ratio must be 0.0–1.0' };
  }

  if (urlError) return { field: 'url', message: urlError };

  if (ingredientURL?.trim() && isVerifiedSource !== true) {
    return { field: 'url', message: 'Source must be verified to submit' };
  }

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
  const [isVerifiedSource, setIsVerifiedSource] = useState(null);
  const [lastVerifiedUrl, setLastVerifiedUrl] = useState('');

  const heatRef = useRef(null);
  const ratioRef = useRef(null);
  const urlRef = useRef(null);
  const heatAnim = useRef(new Animated.Value(0)).current;
  const getHeatColor = useHeatColor();

  useEffect(() => {
    const divisor = VALIDATION_RULES.MAX_SCOVILLE || 16000000;
    const parsed = parseInt(heat || '0', 10);
    const normalized = isNaN(parsed) ? 0 : parsed / divisor;
    const val = Math.min(1, Math.max(0, normalized));
    Animated.timing(heatAnim, {
      toValue: val,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [heat, heatAnim]);

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
    setIsVerifiedSource(null);
  };

  const simulateVerifiableRead = useCallback(async (url) => {
    if (!url || typeof url !== 'string') return false;

    const trustedSignals = ['salsa', 'macha', 'bien macha', 'crispy garlic', 'add to cart'];
    const tryFetch = async () => {
      const res = await fetch(url);
      const html = await res.text();
      return trustedSignals.some((term) => html.toLowerCase().includes(term));
    };

    try {
      return await tryFetch();
    } catch {
      await new Promise((res) => setTimeout(res, 200));
      try {
        return await tryFetch();
      } catch {
        return false;
      }
    }
  }, []);

  const validateUrlDebounced = useCallback(
    debounce(async (url) => {
      if (!url) {
        setIsVerifiedSource(null);
        setUrlError('');
        return;
      }

      const trimmed = normalizeUrl(url);
      const isValid = trimmed.startsWith('http') && validateUrl(trimmed);
      setUrlError(isValid ? '' : 'Invalid URL');

      if (isValid) {
        if (trimmed === lastVerifiedUrl && isVerifiedSource === true) return;
        const verified = await simulateVerifiableRead(trimmed);
        if (verified) {
          setIsVerifiedSource(true);
          setLastVerifiedUrl(trimmed);
        } else {
          setIsVerifiedSource(false);
        }
      } else {
        setIsVerifiedSource(null);
      }
    }, VALIDATION_RULES.URL_DEBOUNCE_MS),
    [simulateVerifiableRead, isVerifiedSource, lastVerifiedUrl],
  );

  useEffect(() => () => validateUrlDebounced.cancel?.(), [validateUrlDebounced]);

  const handleSubmit = async () => {
    const validation = validateSauceForm({ heat, oilSeedRatio, urlError, ingredientURL, isVerifiedSource });
    if (validation) {
      Alert.alert('Validation Error', validation.message);
      if (validation.field === 'heat') heatRef.current?.focus();
      if (validation.field === 'ratio') ratioRef.current?.focus();
      if (validation.field === 'url') urlRef.current?.focus();
      return;
    }

    const data = {
      schema: 'sauce-entry',
      version: '1.0',
      sauceName: sauceName.trim() || null,
      heat: parseInt(heat, 10),
      garlic,
      crispSource,
      crispLevel: crispSource === 'none' ? 'light' : crispLevel,
      smokiness,
      oilSeedRatio: parseFloat(oilSeedRatio),
      ingredientURL: (() => {
        const normalized = normalizeUrl(ingredientURL);
        return validateUrl(normalized) ? normalized : null;
      })(),
      timestamp: new Date().toISOString(),
    };

    try {
      await userMap.set(data);
      resetForm();
      Alert.alert('Success', 'Sauce logged!');
    } catch {
      Alert.alert('Chain Error', 'Network busy, try again');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: theme.spacing.lg, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        <SectionCard title="Name">
          <TextInput
            value={sauceName}
            onChangeText={setSauceName}
            placeholder="e.g. Macha Inferno"
            style={inputStyle}
            accessibilityLabel="Sauce name"
            returnKeyType="next"
          />
        </SectionCard>

        <SectionCard title="Heat">
          <TextInput
            ref={heatRef}
            value={heat}
            onChangeText={(v) => setHeat(v.replace(/[^\d]/g, ''))}
            placeholder="e.g. 8000"
            keyboardType="number-pad"
            style={inputStyle}
            accessibilityLabel="Scoville heat"
            returnKeyType="next"
          />
          <Text style={{ color: theme.colors.text.light, fontSize: 12 }}>
            Typical: Mild {'<'} 5k, Medium 5k–50k, Hot 50k+
          </Text>
          <View style={{
            height: 8,
            backgroundColor: theme.colors.surfaceAlt,
            borderRadius: theme.radius.pill,
            overflow: 'hidden',
            marginTop: theme.spacing.xs,
          }}>
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
          <ChipGroup label="Garlic Intensity" options={SAUCE_OPTIONS.garlic} value={garlic} onChange={setGarlic} />
          <ChipGroup label="Smokiness Level" options={SAUCE_OPTIONS.smokiness} value={smokiness} onChange={setSmokiness} />
        </SectionCard>

        <SectionCard title="Texture">
          <ChipGroup label="Crunch Source" options={SAUCE_OPTIONS.crispSources} value={crispSource} onChange={setCrispSource} />
          <Text style={{ fontSize: 12, color: theme.colors.text.light, marginBottom: 4 }}>
            {crispSourceHints[crispSource]}
          </Text>
          <ChipGroup
            label="Crunch Level"
            options={SAUCE_OPTIONS.crispLevels}
            value={crispLevel}
            onChange={setCrispLevel}
            disabled={crispSource === 'none'}
          />
        </SectionCard>

        <SectionCard title="Oil-to-Seed Ratio">
          <TextInput
            ref={ratioRef}
            value={oilSeedRatio}
            onChangeText={(v) => {
              const t = v.replace(/[^0-9.]/g, '');
              const parts = t.split('.');
              const cleaned = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : t;
              setOilSeedRatio(cleaned);
            }}
            placeholder="0.0–1.0"
            keyboardType="decimal-pad"
            style={inputStyle}
            accessibilityLabel="Oil to seed ratio"
            returnKeyType="next"
          />
        </SectionCard>

        <SectionCard title="Ingredient Link">
          <TextInput
            ref={urlRef}
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
            keyboardType="url"
            accessibilityLabel="Ingredient link URL"
            returnKeyType="done"
          />
          {!!urlError && <Text style={{ color: theme.colors.error, fontSize: 12 }}>{urlError}</Text>}
          {ingredientURL && !urlError && isVerifiedSource !== null ? (
            <Text style={{
              color: isVerifiedSource ? theme.colors.heat.mild : theme.colors.error,
              fontSize: 12,
              marginTop: 4,
            }}>
              {isVerifiedSource ? 'Source Verified ✅' : 'Not Verified ❌'}
            </Text>
          ) : null}
        </SectionCard>
      </ScrollView>

      <StickySubmit
        disabled={!heat || !oilSeedRatio || !!urlError || (!!ingredientURL?.trim() && isVerifiedSource !== true)}
        onPress={handleSubmit}
      />
    </KeyboardAvoidingView>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: theme.colors.outline,
  padding: theme.spacing.sm,
  marginBottom: theme.spacing.md,
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.surfaceAlt,
  color: theme.colors.text.primary,
  fontFamily: theme.typography.fontFamily,
};

