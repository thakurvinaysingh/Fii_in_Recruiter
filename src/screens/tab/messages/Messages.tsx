import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  chat,
  messageBig,
  searchGrey,
} from '../../../components/store/ImageStore';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {chatFilterData} from '../../../constants/Data';
import styles from './StyleMessages';
import Theme from '../../../theme/Theme';
import {gettingChatsList} from '../../../api/ApiServices';
import {RenderChats} from '../../../components/store/ComponentStore';
import {ChatsIF} from '../../../types/DataTypes';
import {
  useFocusEffect,
  useSelector,
} from '../../../components/store/ExternalLibrary';
import {RootState} from '../../../redux/store/Store';
const Messages = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchInput, setSearchInput] = useState('');
  const [chats, setChats] = useState<ChatsIF[]>([]);
  const [filteredChats, setFilteredChats] = useState<ChatsIF[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [isChatAvailable, setIsChatAvailable] = useState(true);

  const {messageReceived} = useSelector(
    (state: RootState) => state.singleMessageSlice,
  );
  // FILTER CHATS BY SEARCH
  const onSearch = (val: string) => {
    setSearchInput(val);
    if (val.length > 0) {
      setIsFocused(false);
      const searchTerm = val.trim().toLowerCase();

      let filtered = chats.filter(item =>
        item.candidate.toLowerCase().includes(searchTerm),
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(chats);
      setSelectedFilter('All');
    }
  };

  // GETTING ALL CHATS
  const getAllChats = async () => {
    setIsLoading(true);
    try {
      const res = await gettingChatsList();
      if (res.success) {
        console.log('res of all chat:', res.data.data);
        setIsLoading(false);
        setFilteredChats(res.data.data);
        setChats(res.data.data);
        if (res.data.data.length > 0) {
          setIsChatAvailable(true);
        } else {
          setIsChatAvailable(false);
        }
      } else {
        console.error('err of all chat:', res.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('err of all chat:', err);
      setIsLoading(false);
    }
  };

  // CALLING THE API TO GET CHAT LIST
  useFocusEffect(
    useCallback(() => {
      getAllChats();
    }, [messageReceived]),
  );

  // CHAT FILTER SELECITON
  const handleChatFilterSelection = (val: string) => {
    setSelectedFilter(val);
    if (val === 'Read') {
      const filteredChat = chats.filter(item => item.unseen_count == 0);
      setFilteredChats(filteredChat);
    } else if (val === 'Unread') {
      const filteredChat = chats.filter(item => item.unseen_count !== 0);
      setFilteredChats(filteredChat);
    } else {
      setFilteredChats(chats);
    }
  };
  return (
    <>
      <View style={GLOBALSTYLE.container}>
        <SafeAreaView>
          <Text
            style={[
              GLOBALSTYLE.authTitle_small,
              GLOBALSTYLE.text_center,
              GLOBALSTYLE.mg_bottom_xs,
            ]}>
            Messages
          </Text>

          {!isChatAvailable ? (
            <View style={styles.no_notification_box}>
              <View style={styles.round_box}>
                <Image
                  source={messageBig}
                  style={styles.notification_big_style}
                />
              </View>
              <Text style={GLOBALSTYLE.medium_title}>No Messages Yet</Text>
              <Text
                style={[
                  GLOBALSTYLE.small_text,
                  GLOBALSTYLE.text_center,
                  styles.text_width,
                ]}>
                You have no messages right now, all the chats will appear here
              </Text>
            </View>
          ) : (
            <>
              {/* SEARCH INPUT FOR FILTER CHAT */}
              <View style={[styles.search_container]}>
                <Image source={searchGrey} style={styles.search_img} />
                <TextInput
                  value={searchInput}
                  onChangeText={onSearch}
                  style={styles.search_input}
                  placeholder="Search chats"
                  placeholderTextColor={Theme.COLORS.GREY}
                />
              </View>

              {/* CHATS FILTER */}
              {!searchInput && (
                <View
                  style={[GLOBALSTYLE.mg_top_xs, GLOBALSTYLE.mg_bottom_xxxs]}>
                  <FlatList
                    horizontal
                    removeClippedSubviews={false}
                    showsHorizontalScrollIndicator={false}
                    data={[{key: 'All', value: 0}, ...chatFilterData]}
                    keyExtractor={item => item.key}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => handleChatFilterSelection(item.key)}
                        style={
                          item.key === selectedFilter
                            ? styles.category_container_active
                            : styles.category_container
                        }
                        activeOpacity={0.7}>
                        <Text
                          style={
                            item.key === selectedFilter
                              ? GLOBALSTYLE.subTitle_white
                              : GLOBALSTYLE.subTitle
                          }>
                          {item.key}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}

              {/* ALL CHATS LIST */}
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={styles.mg_bottom}>
                  <View style={[GLOBALSTYLE.mg_top_xs]}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      removeClippedSubviews={false}
                      data={filteredChats}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <RenderChats item={item} />}
                    />
                  </View>
                </View>
              </ScrollView>
            </>
          )}
        </SafeAreaView>
      </View>

      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}
    </>
  );
};

export default Messages;
