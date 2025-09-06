
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { createCondimentEntry } from '../lib/dave';
import { getHeatComparison } from '../lib/heatUtils';
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
  texture: ['smooth', 'chunky', 'oily', 'sticky', 'crunchy'], 
};

const crispSourceHints = {
  none: '',
  'tortilla-chip': 'Think restaurant salsa crunch',
  'pumpkin-seed': 'Earthy and rich seed crunch',
  sesame: 'Toasty and nutty crunch',
  garlic: 'Crispy confit edge',
  onion: 'Fried shallot or crisped onion bits',
  peanut: 'Classic salsa macha flavor',
};
const sauceTextureHints = {
  smooth: 'Blended base with no visible bits',
  chunky: 'Visible pieces like seeds or chilis',
  oily: 'Oil-forward, likely to separate',
  sticky: 'Thick, syrupy or caramelized base',
  crunchy: 'Bits of fried garlic, onion, or seeds',
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
    return { field: 'heat', message: 'Enter whole number between 0 and 16000000' };
  }

  if (!oilSeedRatio?.trim()) return { field: 'ratio', message: 'Oil-seed ratio required' };
  const r = parseFloat(oilSeedRatio);
  if (isNaN(r) || r < VALIDATION_RULES.MIN_RATIO || r > VALIDATION_RULES.MAX_RATIO) {
    return { field: 'ratio', message: 'Ratio must be 0.0 to 1.0' };
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
  const [sauceTexture, setSauceTexture] = useState('smooth');

  // 🔎 Live flavor tags derived from inputs
  const flavorTags = useMemo(() => {
    const tags = [];

    // Heat buckets
    const h = parseInt(heat || '0', 10);
    if (!isNaN(h)) {
      if (h < 5000) tags.push('🌶️ mild');
      else if (h < 50000) tags.push('🌶️🌶️ medium');
      else tags.push('🌶️🌶️🌶️ hot');
    }

    // Garlic
    if (garlic === 'low') tags.push('🧄 light garlic');
    if (garlic === 'med') tags.push('🧄 garlic-forward');
    if (garlic === 'high') tags.push('🧄🧄 big garlic');

    // Crisp source
    const crispMap = {
      garlic: '🧄 crisp',
      onion: '🧅 crisp',
      peanut: '🥜 peanut crunch',
      'pumpkin-seed': '🎃 seed crunch',
      sesame: '⚪ sesame crunch',
      'tortilla-chip': '🍘 chip crunch',
      'sauce-texture': '🧪 texture-based',
      none: '➖ no crunch',
      other: '✨ other crunch',
    };
    if (crispSource) tags.push(crispMap[crispSource] || '✨ crunch');

    // Crisp level
    if (crispSource && crispSource !== 'none') {
      if (crispLevel === 'light') tags.push('☁️ light crisp');
      if (crispLevel === 'medium') tags.push('⛅ medium crisp');
      if (crispLevel === 'heavy') tags.push('🌑 heavy crisp');
    }

    // Smokiness
    if (smokiness === 'light') tags.push('💨 light smoke');
    if (smokiness === 'medium') tags.push('🔥 smoky');
    if (smokiness === 'strong') tags.push('🔥🔥 very smoky');

    // Oil to seed balance
    const r = parseFloat(oilSeedRatio);
    if (!isNaN(r)) {
      if (r < 0.25) tags.push('🥜 seed-heavy');
      else if (r > 0.5) tags.push('💧 oil-forward');
      else tags.push('🟰 balanced');
    }

    // Texture
    const textureMap = {
      smooth: '🫗 smooth',
      chunky: '🧱 chunky',
      oily: '🛢️ oily',
      sticky: '🍯 sticky',
      crunchy: '🥟 crunchy',
    };
    if (textureMap[sauceTexture]) tags.push(textureMap[sauceTexture]);

    return tags;
  }, [heat, garlic, crispSource, crispLevel, smokiness, oilSeedRatio, sauceTexture]);

  const heatRef = useRef(null);
  const ratioRef = useRef(null);
  const urlRef = useRef(null);
  const heatAnim = useRef(new Animated.Value(0)).current;
  const oilAnim = useRef(new Animated.Value(0)).current;
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

  useEffect(() => {
    const parsed = parseFloat(oilSeedRatio || '0');
    const normalized = isNaN(parsed) ? 0 : Math.min(1, Math.max(0, parsed));
    Animated.timing(oilAnim, {
      toValue: normalized,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [oilSeedRatio]);

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
    setSauceTexture('smooth');
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
      const result = await createCondimentEntry(data);
      console.log('📦 Chain Result:', result);

      if (!result.success) {
        Alert.alert('Chain Error', result.error || 'Network busy, try again');
        return;
      }

      resetForm();
      Alert.alert('Success', 'Sauce logged!');
    } catch (e) {
      console.error('🔥 Unexpected submit error:', e);
      Alert.alert('Chain Error', 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: theme.colors.surface  }}>
      <ScrollView
        contentContainerStyle={{ padding: theme.spacing.lg, paddingBottom: 120, backgroundColor: theme.colors.surface, }}
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
            Typical: Mild {'<'} 5k, Medium 5k to 50k, Hot 50k and above
          </Text>

          <View
            style={{
              height: 8,
              backgroundColor: theme.colors.surfaceAlt,
              borderRadius: theme.radius.pill,
              overflow: 'hidden',
              marginTop: theme.spacing.xs,
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

          {!!heat && !isNaN(Number(heat)) && (
            <Text style={{ fontSize: 14, color: 'black', marginTop: theme.spacing.sm }}>
              Heat Level: {getHeatComparison(Number(heat))}
            </Text>
          )}
        </SectionCard>

        <SectionCard title="Flavor">
          <ChipGroup label="Garlic Intensity" options={SAUCE_OPTIONS.garlic} value={garlic} onChange={setGarlic} />
          <ChipGroup label="Smokiness Level" options={SAUCE_OPTIONS.smokiness} value={smokiness} onChange={setSmokiness} />
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
  />

  <ChipGroup
    label="Sauce Texture"
    options={SAUCE_OPTIONS.texture}
    value={sauceTexture}
    onChange={setSauceTexture}
  />
</SectionCard>

        <SectionCard title="Oil-to-Seed Ratio">
          <TextInput
            ref={ratioRef}
            value={oilSeedRatio}
            onChangeText={(v) => setOilSeedRatio(v.replace(/[^0-9.]/g, ''))}
            placeholder="e.g. 0.6"
            keyboardType="decimal-pad"
            style={inputStyle}
            accessibilityLabel="Oil to seed ratio"
            returnKeyType="next"
          />
          <Text style={{ color: theme.colors.text.light, fontSize: 12 }}>
            0.0 equals all seeds, 1.0 equals all oil
          </Text>

          {/* Visual bar */}
          <View
            style={{
              height: 8,
              backgroundColor: theme.colors.surfaceAlt,
              borderRadius: theme.radius.pill,
              overflow: 'hidden',
              marginTop: theme.spacing.xs,
            }}
          >
            <Animated.View
              style={{
                height: '100%',
                width: oilAnim.interpolate({ inputRange: [0, 1], outputRange: ['2%', '100%'] }),
                backgroundColor: '#c58f4b',
                opacity: oilAnim,
              }}
            />
          </View>

          {/* Ratio tag */}
          {!isNaN(Number(oilSeedRatio)) && oilSeedRatio !== '' && (
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.text.primary,
                marginTop: theme.spacing.sm,
                marginBottom: theme.spacing.sm,
                opacity: 0.9,
              }}
            >
              {Number(oilSeedRatio) < 0.25
                ? '🥜 Mostly seeds'
                : Number(oilSeedRatio) > 0.5
                ? '💧 Mostly oil'
                : '🟰 Balanced'}
            </Text>
          )}
        </SectionCard>

        {/* ✅ New Flavor Tags section */}
        <SectionCard title="Flavor Tags">
          {flavorTags.length === 0 ? (
            <Text style={{ color: theme.colors.text.light, fontSize: 12 }}>
              Tags will appear as you enter heat, garlic, crunch, smoke, ratio, and texture.
            </Text>
          ) : (
            <View style={tagRow}>
              {flavorTags.map((t, i) => (
                <View key={`${t}-${i}`} style={tagChip} accessible accessibilityLabel={t}>
                  <Text style={tagText}>{t}</Text>
                </View>
              ))}
            </View>
          )}
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

// Shared input style
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

// Flavor tag chip styles
const tagRow = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  marginTop: theme.spacing.sm,
  marginHorizontal: -4,   // simulates gap across RN versions
};

const tagChip = {
  borderWidth: 1,
  borderColor: theme.colors.border,
  backgroundColor: theme.colors.surfaceAlt,
  paddingVertical: 8,      // more breathing room
  paddingHorizontal: 12,
  borderRadius: theme.radius.pill,
  minWidth: 88,            // prevents over-compression
  maxWidth: '90%',         // gives room to wrap naturally
  flexShrink: 0,           // stop container from collapsing too far
  marginRight: 8,
  marginBottom: 8,
  alignSelf: 'flex-start', // keeps multi-line chips aligned to top
};

const tagText = {
  fontSize: 14,
  color: theme.colors.text.primary,
  fontFamily: Platform.select({
    ios: theme.typography.fontFamily,
    android: 'System',      // ensures emoji fallback
    default: theme.typography.fontFamily,
  }),
  lineHeight: 20,           // prevents clipping on emoji + text
  includeFontPadding: false,
  textAlignVertical: 'center',
  flexShrink: 1,            // let text wrap instead of clipping
  flexWrap: 'wrap',         // key: allows multi-line text
};
