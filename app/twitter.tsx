
// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function Twitter() {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch dummy user data from JSONPlaceholder
//     fetch("https://jsonplaceholder.typicode.com/users/2")
//       .then((res) => res.json())
//       .then((json) => {
//         // Map dummy data to simulate Twitter analytics
//         const fakeData = {
//           username: json.username,
//           followers: Math.floor(Math.random() * 100000), // Random followers
//           growth: `${(Math.random() * 10).toFixed(1)}% this week`,
//           engagement: `${(Math.random() * 8).toFixed(2)}%`,
//         };
//         setData(fakeData);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color="#1DA1F2" />
//         <Text>Fetching Twitter Analytics...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>🐦 Twitter Analytics</Text>

//       {data ? (
//         <View>
//           <View style={styles.card}>
//             <Text style={styles.label}>Username</Text>
//             <Text style={styles.value}>{data.username}</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Followers</Text>
//             <Text style={styles.value}>{data.followers}</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Growth</Text>
//             <Text style={styles.value}>{data.growth}</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Engagement</Text>
//             <Text style={styles.value}>{data.engagement}</Text>
//           </View>
//         </View>
//       ) : (
//         <Text>No data available</Text>
//       )}

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Export as PDF</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#1DA1F2",
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: "#f9f9f9",
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 16,
//     color: "#666",
//   },
//   value: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginTop: 5,
//   },
//   button: {
//     backgroundColor: "#1DA1F2",
//     padding: 15,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   loading: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Twitter() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dummy user data from JSONPlaceholder
    fetch("https://jsonplaceholder.typicode.com/users/2")
      .then((res) => res.json())
      .then((json) => {
        // Map dummy data to simulate Twitter analytics
        const fakeData = {
          username: json.username,
          followers: Math.floor(Math.random() * 100000), // Random followers
          growth: `${(Math.random() * 10).toFixed(1)}% this week`,
          engagement: `${(Math.random() * 8).toFixed(2)}%`,
        };
        setData(fakeData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleExportPDF = async () => {
    if (!data) {
      Alert.alert("No data", "Nothing to export");
      return;
    }

    const html = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1 style="color:#1DA1F2;">🐦 Twitter Analytics Report</h1>
          <p><strong>Username:</strong> ${data.username}</p>
          <p><strong>Followers:</strong> ${data.followers}</p>
          <p><strong>Growth:</strong> ${data.growth}</p>
          <p><strong>Engagement:</strong> ${data.engagement}</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      console.log("PDF saved at:", uri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("PDF Generated", `Saved at: ${uri}`);
      }
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1DA1F2" />
        <Text>Fetching Twitter Analytics...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🐦 Twitter Analytics</Text>

      {data ? (
        <View>
          <View style={styles.card}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{data.username}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Followers</Text>
            <Text style={styles.value}>{data.followers}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Growth</Text>
            <Text style={styles.value}>{data.growth}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Engagement</Text>
            <Text style={styles.value}>{data.engagement}</Text>
          </View>
        </View>
      ) : (
        <Text>No data available</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleExportPDF}>
        <Text style={styles.buttonText}>Export as PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1DA1F2",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#1DA1F2",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
