//[1]: Insert link here for status codes and names

import { useEffect, useMemo, useState } from "react";
import { useUserStore } from '../storage/userDataStore';
import { useFormStore } from "../storage/useFormStore";
import { FormStatus_totalCount, FormStatus_todayCount } from "../storage/useFormStore";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  SafeAreaView,
  Pressable,
  Animated,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import PagerView from 'react-native-pager-view';
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";

//import AsyncStorage from "@react-native-async-storage/async-storage";
const DashboardScreen: React.FC = () => {
  const url = Constants.expoConfig.extra.API_URL;
  
  const { user} = useUserStore();
  const {setData} = useFormStore();
  const { setStatus_totalCount, resetStatus_totalCount, status_total } = FormStatus_totalCount(); //global Zustand store for total count of forms
  const {setStatus_todayCount, resetStatus_todayCount, status_today } = FormStatus_todayCount(); //global Zustand store for today's count of forms
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Today');
  const slideAnim = useState(new Animated.Value(0))[0];
  const [pageIndex, setPageIndex] = useState(0);
  
  const pageTexts = [
    'Dashboard(Pre)',
    'Dashboard(Post)'
  ];

  const fetchDashboardData = async (userId: number) => {
    try {
      const dashborad_status_count_response_total = await axios.get(`${url}/api/dashboard/getTotalFormsStatusCount/${userId}`);
      const dashborad_status_count_response_today = await axios.get(`${url}/api/dashboard/getTodayFormsStatusCount/${userId}`);

      setData("id",user?.id);
     // console.log("Dashboard Status Count:", dashborad_status_count_response_today.data);

     //convert the array of objects to a map for easy access
      const statusCountMap_total = Object.fromEntries(
        dashborad_status_count_response_total.data.map(item => [item.status, item.count])
      );

      const statusCountMap_today = Object.fromEntries(
        dashborad_status_count_response_today.data.map(item => [item.status, item.count])
      );
      
      //Refer the documentation[1] for the status codes and the corresponding status names
      setStatus_totalCount({
        totalCount_pre: statusCountMap_total[1]+statusCountMap_total[2]+statusCountMap_total[3]+statusCountMap_total[4],
        pendingCount_pre: statusCountMap_total[1]+statusCountMap_total[2],
        rejectedCount_pre: statusCountMap_total[3],
        approvedCount_pre: statusCountMap_total[4],
        totalCount_post: statusCountMap_total[6]+statusCountMap_total[7]+statusCountMap_total[8]+statusCountMap_total[9],
        pendingCount_post: statusCountMap_total[7]+statusCountMap_total[6],
        changerequestedCount_post: statusCountMap_total[8],
        approvedCount_post: statusCountMap_total[9],
        hasfetched_total: true,
      });

      setStatus_todayCount({
        totalCount_pre: statusCountMap_today[1]+statusCountMap_today[2]+statusCountMap_today[3]+statusCountMap_today[4],
        pendingCount_pre: statusCountMap_today[1]+statusCountMap_today[2],
        rejectedCount_pre: statusCountMap_today[3],
        approvedCount_pre: statusCountMap_today[4],
        totalCount_post: statusCountMap_today[6]+statusCountMap_today[7]+statusCountMap_today[8]+statusCountMap_today[9],
        pendingCount_post: statusCountMap_today[7]+statusCountMap_today[6],
        changerequestedCount_post: statusCountMap_today[8],
        approvedCount_post: statusCountMap_today[9],
        hasfetched_total: true,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }
  useEffect(() => {
    if (user?.id) {
      fetchDashboardData(user?.id);
    }
    return () => {
      resetStatus_todayCount();
      resetStatus_totalCount();
    };
  }, [user?.id]);

  if ((status_total?.totalCount_pre === 0 && !status_total?.hasfetched_total)) {
    return <ActivityIndicator />;
  }


  const dashboardDatapre_total = [
    {
      id: '1',
      label: 'Total Submitted',
      icon: 'assignment',
      color: '#4a7744',
      count: status_total.totalCount_pre,
    },
    {
      id: '2',
      label: 'Pending Forms',
      icon: 'hourglass-empty',
      color: '#f4a261',
      count: status_total.pendingCount_pre,
    },
    {
      id: '3',
      label: 'Rejected Forms',
      icon: 'cancel',
      color: '#e63946',
      count: status_total.rejectedCount_pre,
    },
    {
      id: '4',
      label: 'Approved Forms',
      icon: 'check-circle',
      color: '#2a9d8f',
      count: status_total.approvedCount_pre,
    },
  ];

  const dashboardDatapost_total = [
    {
      id: '1',
      label: 'Total Submitted',
      icon: 'assignment',
      color: '#4a7744',
      count: status_total.totalCount_post,
    },
    {
      id: '2',
      label: 'Pending Forms',
      icon: 'hourglass-empty',
      color: '#f4a261',
      count: status_total.pendingCount_post,
    },
    {
      id: '3',
      label: 'Rejected Forms',
      icon: 'cancel',
      color: '#e63946',
      count: status_total.changerequestedCount_post,
    },
    {
      id: '4',
      label: 'Approved Forms',
      icon: 'check-circle',
      color: '#2a9d8f',
      count: status_total.approvedCount_post,
    },
  ];

  const dashboardDatapre_today = [
    {
      id: '1',
      label: 'Total Submitted',
      icon: 'assignment',
      color: '#4a7744',
      count: status_today.totalCount_pre,
    },
    {
      id: '2',
      label: 'Pending Forms',
      icon: 'hourglass-empty',
      color: '#f4a261',
      count: status_today.pendingCount_pre,
    },
    {
      id: '3',
      label: 'Rejected Forms',
      icon: 'cancel',
      color: '#e63946',
      count: status_today.rejectedCount_pre,
    },
    {
      id: '4',
      label: 'Approved Forms',
      icon: 'check-circle',
      color: '#2a9d8f',
      count: status_today.approvedCount_pre,
    },
  ];

  const dashboardDatapost_today = [
    {
      id: '1',
      label: 'Total Submitted',
      icon: 'assignment',
      color: '#4a7744',
      count: status_today.totalCount_post,
    },
    {
      id: '2',
      label: 'Pending Forms',
      icon: 'hourglass-empty',
      color: '#f4a261',
      count: status_today.pendingCount_post,
    },
    {
      id: '3',
      label: 'Rejected Forms',
      icon: 'cancel',
      color: '#e63946',
      count: status_today.changerequestedCount_post,
    },
    {
      id: '4',
      label: 'Approved Forms',
      icon: 'check-circle',
      color: '#2a9d8f',
      count: status_today.approvedCount_post,
    },
  ];

  //Assign data to the currentData variable based on the pageIndex and activeTab
  //pageIndex = 0 for Pre and pageIndex = 1 for Post
  //activeTab = Today or Total
  const currentData = useMemo(() => {
    //console.log("Page Index:", pageIndex);
    // console.log("Active Tab:", activeTab);
    if (pageIndex === 0) {
      return activeTab === 'Today'
        ? dashboardDatapre_today
        : dashboardDatapre_total;
    } else {
      return activeTab === 'Today'
        ? dashboardDatapost_today
        : dashboardDatapost_total;
    }
  }, [pageIndex, activeTab]);

  //console.log("Current Data:", currentData);


   const toggleTab = (tab: string) => {
      setActiveTab(tab);
      Animated.timing(slideAnim, {
        toValue: tab === 'Today' ? 0 : 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };
    const interpolatedTranslate = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80],
    });

    const router = useRouter();
     const renderCard = ({ item }: any) => {
        const handleCardPress = () => {
          switch (item.id) {
            case '1':
              router.push('/totalSubmit');
              break;
            case '2':
              router.push('/pending');
              break;
            case '3':
              router.push('/rejected');
              break;
            case '4':
              router.push('/approved');
              break;
            default:
              break;
          }
        };
        return(
            <TouchableOpacity style={styles.card} onPress={handleCardPress}>
              <MaterialIcons name={item.icon} size={36} color={item.color} />
              <Text style={styles.count}>{item.count}</Text>
              <Text style={styles.cardLabel}>{item.label}</Text>
            </TouchableOpacity>
            );
          };
  

  return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/images/pradan_trans.png")}
          style={styles.logo}
          resizeMode="contain"
        />
  
        <Pressable onPress={() => router.push('/profile')} style={({ pressed }) => [styles.profileCard]}>
          <Image
            source={require('../assets/images/PROFILE.jpg')} //fetch image from the server based on the user_id
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{user?.name}</Text> 
            <Text style={styles.profileDesignation}>{user?.role}</Text>
            <Text style={styles.profileEmail}>{user?.username}</Text>
          </View>
        </Pressable>
  
        <View style={styles.dashboardHeader}>
           <Text style={styles.dashboardTitle}>
          {pageTexts[pageIndex]}
        </Text>
  
          <View style={styles.slideToggleContainer}>
            <Animated.View
              style={[styles.slideHighlight, { transform: [{ translateX: interpolatedTranslate }] }]}
            />
            <Pressable
              style={styles.slideButton}
              onPress={() => toggleTab('Today')}
            >
              <Text style={[styles.slideText, activeTab === 'Today' && styles.activeText]}>
                Today
              </Text>
            </Pressable>
            <Pressable
              style={styles.slideButton}
              onPress={() => toggleTab('Total')}
            >
              <Text style={[styles.slideText, activeTab === 'Total' && styles.activeText]}>
                Total
              </Text>
            </Pressable>
          </View>
        </View>
        <PagerView style={styles.pagerView} initialPage={0}
         onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}>
        <FlatList
        key='1'
          data={currentData}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
        <FlatList
        key='2'
          data={currentData}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
        </PagerView>
  
        <Pressable
          style={styles.newFormButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.newFormText}>Submit New Form</Text>
        </Pressable>
  
        <Modal visible={modalVisible} transparent animationType="slide">
  <Pressable
    style={styles.modalBackground}
    onPress={() => setModalVisible(false)}  // close modal when background pressed
  >
    <Pressable
      style={styles.modalContainer}
      onPress={(e) => e.stopPropagation()}  // prevent closing when clicking inside the container
    >
      <Text style={styles.modalHeader}>Choose a Form</Text>

      <Pressable
        style={styles.optionButton}
        onPress={() => {
          setModalVisible(false);
          router.push("/landform/basicDetails");
        }}
      >
        <Text style={styles.optionText}>Land Development Form</Text>
      </Pressable>

      <Pressable
        style={styles.optionButton}
        onPress={() => {
          setModalVisible(false);
          router.push("/pondform/basicDetails");
        }}
      >
        <Text style={styles.optionText}>Pond Construction Form</Text>
      </Pressable>

      <Pressable
        style={styles.optionButton}
        onPress={() => {
          setModalVisible(false);
          router.push("/plantationform/basicDetails");
        }}
      >
        <Text style={styles.optionText}>Plantation Form</Text>
      </Pressable>

      <Pressable
        style={[styles.optionButton, styles.cancelButton]}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </Pressable>
  </Pressable>
</Modal>

      </SafeAreaView>
    );
  };
  
  export default DashboardScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fefefe',
      paddingHorizontal: 16,
      paddingTop: 10,
    },
    pagerView: {
      flex: 1,
    },
    logo: {
      margin: 10,
      width: 220,
      height: 80,
      marginBottom: 16,
      alignSelf: 'center',
    },
    profileCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginBottom: 12,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
    profileImage: {
      width: 55,
      height: 55,
      borderRadius: 100,
      marginRight: 12,
    },
    profileText: {
      flex: 1,
    },
    profileName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#134e13',
    },
    profileDesignation: {
      fontSize: 14,
      color: '#555',
      marginBottom: 2,
    },
    profileEmail: {
      fontSize: 13,
      color: '#777',
    },
    dashboardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 20,
      marginLeft: 10,
    },
    dashboardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#134e13',
    },
    slideToggleContainer: {
      flexDirection: 'row',
      backgroundColor: '#e6f0e6',
      borderRadius: 10,
      overflow: 'hidden',
      marginRight: 10,
      width: 150,
      height: 30,
      position: 'relative',
    },
    slideButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    slideText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#134e13',
    },
    activeText: {
      color: '#fff',
    },
    slideHighlight: {
      position: 'absolute',
      width: 80,
      height: '100%',
      backgroundColor: '#134e13',
      borderRadius: 10,
      zIndex: 0,
    },
    row: {
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 14,
      paddingVertical: 20,
      paddingHorizontal: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },
    count: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 10,
      color: '#333',
    },
    cardLabel: {
      marginTop: 5,
      fontSize: 14,
      fontWeight: '600',
      color: '#666',
      textAlign: 'center',
    },
    newFormButton: {
      backgroundColor: '#134e13',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      justifyContent: 'center',
      paddingVertical: 14,
      borderRadius: 10,
      marginBottom: 50,
      alignSelf: 'center',
      paddingHorizontal: 25,
    },
    newFormText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.75)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      height: '50%',
      alignItems: 'center',
    },
    modalHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#134e13',
      marginBottom: 18,
    },
    optionButton: {
      backgroundColor: '#134e13',
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginBottom: 14,
      width: '100%',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    },
    optionText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    cancelButton: {
      backgroundColor: '#dcdcdc',
    },
    cancelText: {
      color: '#333333',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  