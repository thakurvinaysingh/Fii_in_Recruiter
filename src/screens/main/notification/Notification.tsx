import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {backMain, notificationBig} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  useNavigation,
} from '../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
import {RenderNotification} from '../../../components/store/ComponentStore';
import {gettingNotification} from '../../../api/ApiServices';
import {
  FlatNotificationItem,
  NotificationItem,
  NotificationSection,
} from '../../../types/DataTypes';
import styles from './StyleNotification';

const flattenNotifications = (
  sections: NotificationSection[],
): FlatNotificationItem[] => {
  const result: FlatNotificationItem[] = [];

  sections.forEach(section => {
    result.push({type: 'label', label: section.datelabel});
    section.data.forEach(notification => {
      result.push({type: 'notification', ...notification});
    });
  });

  return result;
};
const Notification = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const [notificationData, setNotificationData] = useState<NotificationItem[]>(
    [],
  );

  const [flatNotifications, setFlatNotifications] = useState<
    FlatNotificationItem[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const handleBack = () => {
    navigation.navigate('BOTTOM_TAB', {});
  };

  // GETTING NOTIFICATION LIST
  const getNotificationList = async () => {
    setIsLoading(true);
    try {
      const res = await gettingNotification();
      if (res.success) {
        console.log('res of notification list:', res.data.data[0]);
        setNotificationData(res.data.data[0]);
        setIsLoading(false);
        const rawSections: NotificationSection[] = res.data.data;
        const flattened = flattenNotifications(rawSections);
        setFlatNotifications(flattened);
      } else {
        console.error('err in notification list:', res.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('err in notification list:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotificationList();
  }, []);

  return (
    <>
      <View style={GLOBALSTYLE.container}>
        <SafeAreaView>
          <View style={GLOBALSTYLE.flex}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={30}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <Text style={GLOBALSTYLE.authTitle_small}>Notifications</Text>
            <Text></Text>
          </View>

          {isLoading ? (
            <View style={GLOBALSTYLE.activity_indicator_container_middle}>
              <ActivityIndicator size="large" color="#0165fc" />
            </View>
          ) : flatNotifications.length > 0 ? (
            <View style={[GLOBALSTYLE.mg_top_s, styles.mg_bottom]}>
              <FlatList
                removeClippedSubviews={false}
                data={flatNotifications}
                keyExtractor={(item, index) =>
                  item.type === 'label'
                    ? `label-${item.label}-${index}`
                    : `notif-${item.id}`
                }
                renderItem={({item}) => {
                  if (item.type === 'label') {
                    return (
                      <Text
                        style={[GLOBALSTYLE.input_title, {marginVertical: 8}]}>
                        {item.label}
                      </Text>
                    );
                  } else {
                    return <RenderNotification item={item} />;
                  }
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View style={styles.no_notification_box}>
              <View style={styles.round_box}>
                <Image
                  source={notificationBig}
                  style={styles.notification_big_style}
                />
              </View>
              <Text style={GLOBALSTYLE.medium_title}>No Notification Yet</Text>
              <Text
                style={[
                  GLOBALSTYLE.small_text,
                  GLOBALSTYLE.text_center,
                  styles.text_width,
                ]}>
                You have no notification right now, notifications will appear
                here
              </Text>
            </View>
          )}
        </SafeAreaView>
      </View>
    </>
  );
};

export default Notification;
