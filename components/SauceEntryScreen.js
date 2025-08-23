
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { userMap } from '../lib/dave';


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
    []
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
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Sauce Name</Text>
        <TextInput
          value={sauceName}
          onChangeText={setSauceName}
          placeholder="e.g. Macha Inferno"
          style={styles.input}
        />

        <Text style={styles.label}>Scoville Heat Level</Text>
        <TextInput
          value={heat}
          onChangeText={setHeat}
          placeholder="e.g. 8000"
          keyboardType="number-pad"
          style={styles.input}
        />
      <Text style={styles.hint}>
  Typical: Mild &lt;5k, Medium 5k–50k, Hot 50k+ — measured in Scoville Heat Units (SHU)
</Text>
<View style={{ height: 10 }} />
        <GarlicSelector value={garlic} onChange={setGarlic} />
        <SmokinessSelector value={smokiness} onChange={setSmokiness} />

        <OptionSelector
          label="Crunch Source"
          options={SAUCE_OPTIONS.crispSources}
          value={crispSource}
          onChange={setCrispSource}
        />

        <OptionSelector
          label="Crunch Level"
          options={SAUCE_OPTIONS.crispLevels}
          value={crispLevel}
          onChange={setCrispLevel}
          disabled={crispSource === 'none'}
          hint={crispSourceHints[crispSource]}
        />

        <Text style={styles.label}>Oil to Seed Ratio</Text>
        <TextInput
          value={oilSeedRatio}
          onChangeText={setOilSeedRatio}
          placeholder="0.0–1.0"
          keyboardType="decimal-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Ingredient URL (Optional)</Text>
        <TextInput
          value={ingredientURL}
          onChangeText={(url) => {
            setIngredientURL(url);
            setUrlError('');
            validateUrlDebounced(url);
          }}
          placeholder="https://..."
          style={[styles.input, urlError ? styles.errorBorder : null]}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {!!urlError && <Text style={styles.errorText}>{urlError}</Text>}

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function GarlicSelector({ value, onChange }) {
  return (
    <View style={styles.segmentGroup}>
      <Text style={styles.label}>Garlic Intensity</Text>
      <View style={styles.segmentContainer}>
        {SAUCE_OPTIONS.garlic.map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.segment, value === level && styles.selectedSegment]}
            onPress={() => onChange(level)}
          >
            <Text style={[styles.segmentText, value === level && styles.selectedText]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function SmokinessSelector({ value, onChange }) {
  return (
    <View style={styles.segmentGroup}>
      <Text style={styles.label}>Smokiness Level</Text>
      <View style={styles.segmentContainer}>
        {SAUCE_OPTIONS.smokiness.map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.segment, value === level && styles.selectedSegment]}
            onPress={() => onChange(level)}
          >
            <Text style={[styles.segmentText, value === level && styles.selectedText]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function OptionSelector({ label, options, value, onChange, disabled, hint }) {
  return (
    <View style={styles.segmentGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.segmentContainer, disabled && styles.segmentDisabled]}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.segment, value === opt && styles.selectedSegment]}
            onPress={() => {
              if (!disabled) onChange(opt);
            }}
            disabled={disabled}
          >
            <Text style={[styles.segmentText, value === opt && styles.selectedText]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {!!hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  segmentGroup: { marginBottom: 20 },
  segmentContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  segment: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  selectedSegment: { backgroundColor: '#ff9800' },
  selectedText: { color: '#fff', fontWeight: 'bold' },
  segmentDisabled: { opacity: 0.5 },
  errorBorder: { borderColor: 'red' },
  errorText: { color: 'red', marginBottom: 10 },
  hint: { fontStyle: 'italic', fontSize: 12, color: '#666', marginTop: 5 },
});

