import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { getSauceHistory } from '../../hooks/useSauceHistory';

type SauceEntry = {
  sauceName?: string;
  heat?: string;
  oilSeedRatio?: string;
  garlic?: string;
  crispSource?: string;
  crispLevel?: string;
  smokiness?: string;
  sauceTexture?: string;
  ingredientURL?: string;
};

export default function HistoryScreen() {
  const [entries, setEntries] = useState<SauceEntry[]>([]);

  useEffect(() => {
    getSauceHistory()
      .then(setEntries)
      .catch((err: unknown) => {
        console.error('Error loading history:', err);
      });
  }, []);

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Sauce History
      </Text>

      {entries.length === 0 ? (
        <Text>No sauces saved yet.</Text>
      ) : (
        entries.map((entry, i) => (
          <View
            key={entry.ingredientURL || i}
            style={{
              marginBottom: 16,
              padding: 12,
              borderRadius: 8,
              backgroundColor: '#f9f9f9',
              borderColor: '#ccc',
              borderWidth: 1,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
              {entry?.sauceName ? entry.sauceName : `Sauce #${i + 1}`}
            </Text>

            {typeof entry?.heat === 'string' && <Text>Scoville: {entry.heat}</Text>}
            {typeof entry?.oilSeedRatio === 'string' && <Text>Oil-Seed Ratio: {entry.oilSeedRatio}</Text>}
            {typeof entry?.garlic === 'string' && <Text>Garlic: {entry.garlic}</Text>}
            {typeof entry?.crispSource === 'string' && <Text>Crisp Source: {entry.crispSource}</Text>}
            {typeof entry?.crispLevel === 'string' && <Text>Crisp Level: {entry.crispLevel}</Text>}
            {typeof entry?.smokiness === 'string' && <Text>Smokiness: {entry.smokiness}</Text>}
            {typeof entry?.sauceTexture === 'string' && <Text>Texture: {entry.sauceTexture}</Text>}
            {typeof entry?.ingredientURL === 'string' && <Text>URL: {entry.ingredientURL}</Text>}
          </View>
        ))
      )}
    </ScrollView>
  );
}
