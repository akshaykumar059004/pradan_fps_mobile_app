// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   Image,
//   Modal,
//   Animated,
//   TouchableOpacity,
// } from 'react-native';
// import PagerView from 'react-native-pager-view';
// import { MaterialIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';

// const DashboardScreen: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [activeTab, setActiveTab] = useState('Today');
//   const slideAnim = useState(new Animated.Value(0))[0];
//   const [pageIndex, setPageIndex] = useState(0);

//   const pageTexts = [
//     'Dashboard(Pre)',
//     'Dashboard(Post)'
//   ];

//   const dashboardData = [
//     {
//       id: '1',
//       label: 'Total Submitted',
//       icon: 'assignment',
//       color: '#4a7744',
//       count: 120,
//     },
//     {
//       id: '2',
//       label: 'Pending Forms',
//       icon: 'hourglass-empty',
//       color: '#f4a261',
//       count: 45,
//     },
//     {
//       id: '3',
//       label: 'Rejected Forms',
//       icon: 'cancel',
//       color: '#e63946',
//       count: 15,
//     },
//     {
//       id: '4',
//       label: 'Approved Forms',
//       icon: 'check-circle',
//       color: '#2a9d8f',
//       count: 60,
//     },
//   ];

//   const toggleTab = (tab: string) => {
//     setActiveTab(tab);
//     Animated.timing(slideAnim, {
//       toValue: tab === 'Today' ? 0 : 1,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   };

//   const interpolatedTranslate = slideAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 80],
//   });

//   const renderCard = ({ item }: any) => {
//     const handleCardPress = () => {
//       switch (item.id) {
//         case '1':
//           router.push('/pre/filter_section_total');
//           break;
//         case '2':
//           router.push('/pre/filter_section_pending');
//           break;
//         case '3':
//           router.push('/pre/filter_section_rejected');
//           break;
//         case '4':
//           router.push('/pre/filter_section_approved');
//           break;
//         default:
//           break;
//       }
//     };
//     return(
//     <TouchableOpacity style={styles.card} onPress={handleCardPress}>
//       <MaterialIcons name={item.icon} size={36} color={item.color} />
//       <Text style={styles.count}>{item.count}</Text>
//       <Text style={styles.cardLabel}>{item.label}</Text>
//     </TouchableOpacity>
//     );
//   };
//   const renderCard2 = ({ item }: any) => {
//     const handleCardPress = () => {
//       switch (item.id) {
//         case '1':
//           router.push('/post/filter_section_total');
//           break;
//         case '2':
//           router.push('/post/filter_section_pending');
//           break;
//         case '3':
//           router.push('/post/filter_section_rejected');
//           break;
//         case '4':
//           router.push('/post/filter_section_approved');
//           break;
//         default:
//           break;
//       }
//     };
//     return(
//     <TouchableOpacity style={styles.card} onPress={handleCardPress}>
//       <MaterialIcons name={item.icon} size={36} color={item.color} />
//       <Text style={styles.count}>{item.count}</Text>
//       <Text style={styles.cardLabel}>{item.label}</Text>
//     </TouchableOpacity>
//     );
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <Image
//         source={require("../assets/images/pradan_logo2.jpeg")}
//         style={styles.logo}
//         resizeMode="contain"
//       />

//       <Pressable onPress={() => router.replace('/profile')} style={({ pressed }) => [styles.profileCard]}>
//         <Image
//           source={require('../assets/images/akk.jpeg')}
//           style={styles.profileImage}
//         />
//         <View style={styles.profileText}>
//           <Text style={styles.profileName}>Akshaykumar S</Text>
//           <Text style={styles.profileDesignation}>Associate</Text>
//           <Text style={styles.profileEmail}>akshaykumar059004@pradan.net</Text>
//         </View>
//       </Pressable>

//       <View style={styles.dashboardHeader}>
//          <Text style={styles.dashboardTitle}>
//         {pageTexts[pageIndex]}
//       </Text>

//         <View style={styles.slideToggleContainer}>
//           <Animated.View
//             style={[styles.slideHighlight, { transform: [{ translateX: interpolatedTranslate }] }]}
//           />
//           <Pressable
//             style={styles.slideButton}
//             onPress={() => toggleTab('Today')}
//           >
//             <Text style={[styles.slideText, activeTab === 'Today' && styles.activeText]}>
//               Today
//             </Text>
//           </Pressable>
//           <Pressable
//             style={styles.slideButton}
//             onPress={() => toggleTab('Total')}
//           >
//             <Text style={[styles.slideText, activeTab === 'Total' && styles.activeText]}>
//               Total
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//       <PagerView style={styles.pagerView} initialPage={0}
//        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}>
//       <FlatList
//       key='1'
//         data={dashboardData}
//         numColumns={2}
//         renderItem={renderCard}
//         keyExtractor={(item) => item.id}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={{ paddingBottom: 10 }}
//       />
//       <FlatList
//       key='2'
//         data={dashboardData}
//         numColumns={2}
//         renderItem={renderCard2}
//         keyExtractor={(item) => item.id}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={{ paddingBottom: 10 }}
//       />
//       </PagerView>

//       <Pressable
//         style={styles.newFormButton}
//         onPress={() => setModalVisible(true)}
//       >
//         <MaterialIcons name="add-circle-outline" size={22} color="#fff" />
//         <Text style={styles.newFormText}>Submit New Form</Text>
//       </Pressable>

//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalHeader}>Choose a Form</Text>

//             <Pressable
//               style={styles.optionButton}
//               onPress={() => {
//                 setModalVisible(false);
//                 router.push("/Land_Form/Basic details");
//               }}
//             >
//               <Text style={styles.optionText}>Land Development Form</Text>
//             </Pressable>

//             <Pressable
//               style={styles.optionButton}
//               onPress={() => {
//                 setModalVisible(false);
//                 router.push("/pond_form/Basic details");
//               }}
//             >
//               <Text style={styles.optionText}>Pond Construction Form</Text>
//             </Pressable>

//             <Pressable
//               style={styles.optionButton}
//               onPress={() => {
//                 setModalVisible(false);
//                 router.push("/plantation_form/Basic details");
//               }}
//             >
//               <Text style={styles.optionText}>Plantation Form</Text>
//             </Pressable>

//             <Pressable
//               style={[styles.optionButton, styles.cancelButton]}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.cancelText}>Cancel</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default DashboardScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fefefe',
//     paddingHorizontal: 16,
//     paddingTop: 10,
//   },
//   pagerView: {
//     flex: 1,
//   },
//   logo: {
//     margin: 10,
//     width: 220,
//     height: 80,
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   profileCard: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     marginBottom: 12,
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 4,
//   },
//   profileImage: {
//     width: 55,
//     height: 55,
//     borderRadius: 100,
//     marginRight: 12,
//   },
//   profileText: {
//     flex: 1,
//   },
//   profileName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#134e13',
//   },
//   profileDesignation: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 2,
//   },
//   profileEmail: {
//     fontSize: 13,
//     color: '#777',
//   },
//   dashboardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     marginTop: 20,
//     marginLeft: 10,
//   },
//   dashboardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#134e13',
//   },
//   slideToggleContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#e6f0e6',
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginRight: 10,
//     width: 150,
//     height: 30,
//     position: 'relative',
//   },
//   slideButton: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   slideText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#134e13',
//   },
//   activeText: {
//     color: '#fff',
//   },
//   slideHighlight: {
//     position: 'absolute',
//     width: 80,
//     height: '100%',
//     backgroundColor: '#134e13',
//     borderRadius: 10,
//     zIndex: 0,
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     paddingVertical: 20,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     marginHorizontal: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 5,
//   },
//   count: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color: '#333',
//   },
//   cardLabel: {
//     marginTop: 5,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#666',
//     textAlign: 'center',
//   },
//   newFormButton: {
//     backgroundColor: '#134e13',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     justifyContent: 'center',
//     paddingVertical: 14,
//     borderRadius: 10,
//     marginBottom: 50,
//     alignSelf: 'center',
//     paddingHorizontal: 25,
//   },
//   newFormText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.75)',
//     justifyContent: 'flex-end',
//   },
//   modalContainer: {
//     backgroundColor: '#ffffff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 24,
//     height: '50%',
//     alignItems: 'center',
//   },
//   modalHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#134e13',
//     marginBottom: 18,
//   },
//   optionButton: {
//     backgroundColor: '#134e13',
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: 14,
//     width: '100%',
//     alignItems: 'center',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   optionText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   cancelButton: {
//     backgroundColor: '#dcdcdc',
//   },
//   cancelText: {
//     color: '#333333',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
// return (
//   <View style={styles.container}>
//     {/* Main content */}
//     <View style={styles.mainContent}>
//       <Text style={styles.title}>Welcome to Dashboard</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/profile")}
//       >
//         <Text style={styles.buttonText}>Profile</Text>
//       </TouchableOpacity>


//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/totalSubmit")}
//       >
//         <Text style={styles.buttonText}>Total Submit</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/pending")}
//       >
//         <Text style={styles.buttonText}>Pending</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/rejected")}
//       >
//         <Text style={styles.buttonText}>Rejected</Text>
//       </TouchableOpacity>


//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/approved")}
//       >
//         <Text style={styles.buttonText}>Approved</Text>
//       </TouchableOpacity>

//       {/* New Form Button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => setShowFormModal(true)}
//       >
//         <Text style={styles.buttonText}>New Form</Text>
//       </TouchableOpacity>
//     </View>

//     {/* Bottom Sheet Modal */}
//     {/* Bottom Sheet Modal */}
// <Modal
// visible={showFormModal}
// animationType="slide"
// transparent
// onRequestClose={() => setShowFormModal(false)}
// >
// <View style={styles.modalOverlay}>
//   <TouchableOpacity
//     style={styles.overlayTouchable}
//     activeOpacity={1}
//     onPressOut={() => setShowFormModal(false)}
//   />
//   <View style={styles.bottomSheet}>
//     <TouchableOpacity
//       style={styles.modalButton}
//       onPress={() => {
//         setShowFormModal(false);
//         router.push("/landform/basicDetails");
//       }}
//     >
//       <Text style={styles.modalButtonText}>Land Form</Text>
//     </TouchableOpacity>

//     <TouchableOpacity
//       style={styles.modalButton}
//       onPress={() => {
//         setShowFormModal(false);
//         router.push("/pondform/basicDetails");
//       }}
//     >
//       <Text style={styles.modalButtonText}>Pond Form</Text>
//     </TouchableOpacity>

//     <TouchableOpacity
//       style={styles.modalButton}
//       onPress={() => {
//         setShowFormModal(false);
//         router.push("/plantationform/basicDetails");
//       }}
//     >
//       <Text style={styles.modalButtonText}>Plantation Form</Text>
//     </TouchableOpacity>

//     {/* Cancel Button */}
//     <TouchableOpacity
//       style={[styles.modalButton, { backgroundColor: "gray" }]}
//       onPress={() => setShowFormModal(false)}
//     >
//       <Text style={styles.modalButtonText}>Cancel</Text>
//     </TouchableOpacity>
//   </View>
// </View>
// </Modal>

//   </View>
// );
// }
// const styles = StyleSheet.create({
// container: {
//   flex: 1,
// },
// overlayTouchable: {
//   flex: 1,
// },
// mainContent: {
//   flex: 1,
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "#f9f9f9",
// },
// title: {
//   fontSize: 24,
//   fontWeight: "bold",
//   marginBottom: 30,
// },
// button: {
//   backgroundColor: "#007bff",
//   padding: 15,
//   borderRadius: 10,
//   width: "80%",
//   alignItems: "center",
//   marginVertical: 10,
// },
// buttonText: {
//   color: "#fff",
//   fontSize: 18,
//   fontWeight: "600",
// },
// modalOverlay: {
//   flex: 1,
//   justifyContent: "flex-end",
//   backgroundColor: "rgba(0,0,0,0.5)",
// },
// bottomSheet: {
//   backgroundColor: "#fff",
//   padding: 20,
//   borderTopLeftRadius: 20,
//   borderTopRightRadius: 20,
// },
// modalTitle: {
//   fontSize: 20,
//   fontWeight: "bold",
//   textAlign: "center",
//   marginBottom: 10,
// },
// modalButton: {
//   padding: 15,
//   backgroundColor: "#007bff",
//   borderRadius: 10,
//   marginVertical: 5,
// },
// modalButtonText: {
//   color: "#fff",
//   textAlign: "center",
//   fontWeight: "600",
// },
// cancelButton: {
//   padding: 15,
//   backgroundColor: "red",
//   borderRadius: 10,
//   marginTop: 10,
// },
// cancelButtonText: {
//   color: "#fff",
//   textAlign: "center",
//   fontWeight: "600",
// },
// });