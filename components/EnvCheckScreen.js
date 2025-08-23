import { ScrollView, StyleSheet, Text, View } from 'react-native';

const EnvCheckScreen = () => {
  const envVars = {
    USER_MAP_CONTRACT_ADDRESS: process.env.EXPO_PUBLIC_USER_MAP_CONTRACT_ADDRESS,
    TREASURY_CONTRACT_ADDRESS: process.env.EXPO_PUBLIC_TREASURY_CONTRACT_ADDRESS,
    RPC_ENDPOINT: process.env.EXPO_PUBLIC_RPC_ENDPOINT,
    REST_ENDPOINT: process.env.EXPO_PUBLIC_REST_ENDPOINT,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🌶️ ENV VAR CHECK</Text>
      {Object.entries(envVars).map(([key, value]) => (
        <View key={key} style={styles.block}>
          <Text style={styles.label}>{key}</Text>
          <Text style={styles.value}>{value || '❌ Not loaded'}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  block: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    color: '#333',
    fontFamily: 'Courier',
  },
});

export default EnvCheckScreen;
