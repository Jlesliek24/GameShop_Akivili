// src/main/News.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking
} from 'react-native';
import { GAMESPOT_API_KEY } from '@env';
console.log('🔑 GAMESPOT_API_KEY is:', GAMESPOT_API_KEY);

type Article = {
  id: string;
  title: string;
  deck: string;
  image: { icon_url: string };
  publish_date: string;
  site_detail_url: string;
};

export default function News() {
  const [articles, setArticles]     = useState<Article[]>([]);
  const [loading, setLoading]       = useState<boolean>(true);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
       try {
        if (!GAMESPOT_API_KEY) {
          throw new Error('API key is missing (check .env)');
        }

        const fields = ['id','title','deck','image','publish_date','site_detail_url'].join(',');
        const url = `https://www.gamespot.com/api/articles/` +
                    `?api_key=${GAMESPOT_API_KEY}` +
                    `&format=json` +
                    `&limit=20` +
                    `&field_list=${fields}` +
                    `&sort=publish_date:desc`;

        console.log('Fetching GameSpot news from URL:', url);
        const res = await fetch(url);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${res.statusText} - ${text}`);
        }
        const json = await res.json();
        setArticles(json.results || []);
      } catch (e: any) {
        console.warn('Failed to fetch GameSpot news', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFA800" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  if (articles.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No articles found.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Linking.openURL(item.site_detail_url)}
    >
      {item.image?.icon_url && (
        <Image source={{ uri: item.image.icon_url }} style={styles.thumbnail} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.deck} numberOfLines={2}>
          {item.deck}
        </Text>
        <Text style={styles.date}>
          {new Date(item.publish_date).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={articles}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 16,
  },
  error: {
    color: 'red', fontSize: 16, textAlign: 'center',
  },
  empty: {
    fontSize: 16, color: '#555',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  thumbnail: {
    width: 100, height: 100,
  },
  textContainer: {
    flex: 1, padding: 12,
  },
  title: {
    fontSize: 16, fontWeight: '700', marginBottom: 4,
  },
  deck: {
    fontSize: 14, color: '#555', marginBottom: 6,
  },
  date: {
    fontSize: 12, color: '#999',
  },
});
