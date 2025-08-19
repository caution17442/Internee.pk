
// import { useEffect, useState } from "react";
// import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function Instagram() {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 1. Fetch user info
//         const userRes = await fetch("https://jsonplaceholder.typicode.com/users/1");
//         const user = await userRes.json();

//         // 2. Fetch posts by that user
//         const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
//         const posts = await postsRes.json();

//         // Build analytics object
//         const analytics = {
//           username: user.username,
//           followers_count: user.id * 1000, // fake followers count based on ID
//           media_count: posts.length,
//           impressions: posts.length * 150, // derived
//           reach: posts.length * 100,       // derived
//           engagement_rate: posts.length > 0 
//             ? ((posts.length / (user.id * 1000)) * 100).toFixed(2) + "%" 
//             : "0%",
//         };

//         setData(analytics);
//       } catch (err) {
//         console.error("Error fetching JSONPlaceholder:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color="#E1306C" />
//         <Text>Fetching Instagram Analytics...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>📷 Instagram Analytics</Text>

//       {data ? (
//         <View>
//           <View style={styles.card}>
//             <Text style={styles.label}>Username</Text>
//             <Text style={styles.value}>{data.username}</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Followers</Text>
//             <Text style={styles.value}>{data.followers_count}</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Posts</Text>
//             <Text style={styles.value}>{data.media_count}</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Impressions</Text>
//             <Text style={styles.value}>{data.impressions}</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Reach</Text>
//             <Text style={styles.value}>{data.reach}</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Engagement Rate</Text>
//             <Text style={styles.value}>{data.engagement_rate}</Text>
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
//     color: "#E1306C",
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
//     backgroundColor: "#E1306C",
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
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Instagram() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch fake user data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/3")
      .then((res) => res.json())
      .then((json) => {
        const fakeData = {
          username: json.username,
          followers: Math.floor(Math.random() * 200000),
          growth: `${(Math.random() * 15).toFixed(1)}% this month`,
          engagement: `${(Math.random() * 10).toFixed(2)}%`,
        };
        setData(fakeData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Generate PDF function
  const generatePDF = async () => {
    if (!data) return;

    const html = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1 style="color:#E1306C; text-align:center;">📸 Instagram Analytics</h1>
          <p><strong>Username:</strong> ${data.username}</p>
          <p><strong>Followers:</strong> ${data.followers}</p>
          <p><strong>Growth:</strong> ${data.growth}</p>
          <p><strong>Engagement:</strong> ${data.engagement}</p>
        </body>
      </html>
    `;

    try {
      // Generate PDF file
      const { uri } = await Print.printToFileAsync({ html });

      // Share PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        console.log("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#E1306C" />
        <Text>Fetching Instagram Analytics...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📸 Instagram Analytics</Text>

      {data ? (
        <>
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
        </>
      ) : (
        <Text>No data available</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={generatePDF}>
        <Text style={styles.buttonText}>Export as PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#E1306C",
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
  label: { fontSize: 16, color: "#666" },
  value: { fontSize: 20, fontWeight: "bold", color: "#333", marginTop: 5 },
  button: {
    backgroundColor: "#E1306C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});
