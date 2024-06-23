import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import { getCollections, CollectionsResponse } from '@/utils/pexels';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from 'react-native-masonry-list';

type CollectionPhoto = {
  id: number;
  url: string;
  src: {
    medium: string;
    original: string;
  };
};

async function getPhotos(collectionId: string): Promise<CollectionPhoto[]> {
  const response = await fetch(`https://api.pexels.com/v1/collections/${collectionId}?per_page=30`, {
    headers: {
      Authorization: "31PTanDobJJiJodjGrX3AqMc1Ybp2mu6GK10RLgADzyII08kn7BC579P",
    },
  });
  const data = await response.json();
  return data.media;
}

export default function HomeScreen() {
  const { data: collectionsData, error: collectionsError, isLoading: collectionsLoading } = useQuery<CollectionsResponse>('collections', getCollections);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  const { data: photos, error: photosError, isLoading: photosLoading } = useQuery(
    ['photos', selectedCollectionId],
    () => getPhotos(selectedCollectionId!),
    { enabled: !!selectedCollectionId }
  );

  useEffect(() => {
    if (collectionsData && collectionsData.collections.length > 0) {
      const initialCollectionId = collectionsData.collections[0].id;
      setSelectedCollectionId(initialCollectionId);
    }
  }, [collectionsData]);

  const handleCategoryPress = (collectionId: string) => {
    setSelectedCollectionId(collectionId);
  };

  if (collectionsError) {
    return <ThemedText>Error fetching collections</ThemedText>;
  }

  if (photosError) {
    return <ThemedText>Error fetching photos</ThemedText>;
  }

  return (
    <ThemedView>
      <TextInput style={styles.input} placeholder='search here..' placeholderTextColor={'#333'} />
      <Text style={styles.headings}>Explore</Text>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {collectionsData?.collections.map((collection) => (
          <TouchableOpacity key={collection.id} onPress={() => handleCategoryPress(collection.id)}>
            <View style={styles.collectionContainer}>
              <Text style={styles.collectionTitle}>{collection.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.imagesContainer}>
        {collectionsLoading || photosLoading ? (
          <Text>Loading collections...</Text>
        ) : (
          <MasonryList
          images={photos?.length !== 0 && photos?.map(photo => ({
            source:{ uri: photo?.src?.medium || photo?.src?.original},
            uri: photo?.src?.medium || photo?.src?.original,
            id: photo?.id.toString(),
            dimensions: { width: 800, height: 1220 } 
          })) || []}
          columns={2}
          spacing={2}
          style={{ marginHorizontal: wp('5%') }}
        />
          )}
        </View>
      </ThemedView>
    );
  }
  
  const styles = StyleSheet.create({
    input: {
      borderColor: '#000',
      borderWidth: 1,
      width: wp('90%'),
      height: 45,
      borderRadius: 10,
      padding: 10,
      margin: 'auto',
    },
    headings: {
      fontSize: wp(5.4),
      marginTop: 15,
      fontWeight: 'bold',
    },
    scrollView: {
      marginVertical: 15,
    },
    collectionContainer: {
      marginRight: 20,
      alignItems: 'center',
    },
    collectionTitle: {
      fontSize: wp(4),
      fontWeight: 'bold',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    },
    imagesContainer: {
      marginTop: 10,
      flex: 1,
    },
  });
  
