import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Alert, View,Image } from "react-native";
import { Card, Text, Button, Divider, IconButton } from "react-native-paper";
import { useFormStore } from "../../storage/useFormStore";
import axios from "axios";
import Constants from "expo-constants";
import { useUserStore } from '../../storage/userDataStore';

const url = Constants.expoConfig.extra.API_URL;

export default function Preview() {
  //const url = Constants.expoConfig.extra.API_URL;
  const {user} = useUserStore();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data, submittedForms, setData, submitForm } = useFormStore();
  const canEdit = () => {
    if (!isSubmittedPreview) return true; // if it's unsubmitted form
    const status = selectedForm?.bankDetails?.formStatus;
    return status === "Pending" || status === "Rejected";
  };

const isSubmittedPreview = !!id;
const selectedForm = isSubmittedPreview
  ? submittedForms.find((form) => form.id === id)
  : data;
  // console.log("Selected Form:", selectedForm);

  if (!selectedForm) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", color: "red" }}>Form not found!</Text>
      </View>
    );
  }

  const [submitting, setSubmitting] = React.useState(false);

const handleSubmit = async () => {
  if (submitting) return; // prevent double taps

  try {
    setSubmitting(true);

    // Prepare formType and formStatus up front
    //const userStatus = data.bankDetails?.formStatus || "Not Filled";
    
    // setData("formStatus", userStatus);
   // setData("username", user?.username);

    // Wait a tick to ensure the state is updated in Zustand
    //await new Promise((resolve) => setTimeout(resolve, 50));
    //console.log("Form data before submission:", user?.username);
    //const username = user?.username;
    await axios.post(`${url}/api/formData/postLandformData`, data);

    // Now submit safely
    await submitForm();

    Alert.alert("Success", "Form Successfully Submitted!", [
      { text: "OK", onPress: () => router.push("/dashboard") },
    ]);
  } catch (error) {
    Alert.alert("Error", "Failed to submit the form. Please try again.\n" + error);
  } finally {
    setSubmitting(false);
  }
};

  

  const renderSection = (title: string, fields: any[], editRoute: string) => (
    <Card style={styles.card}>
      <Card.Title title={title} />
      <Card.Content>
        {fields.map((field, index) => (
          <View key={index} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            {Array.isArray(field.value) ? (
              field.value.map((item, idx) => {
                if (typeof item === "object" && item?.label && item?.uri) {
                  return (
                    <View key={idx} style={styles.fileRow}>
                      <Text style={styles.value}>{item.label}</Text>
                      <Button
                        mode="text"
                        onPress={() =>
                          router.push({
                            pathname: "/../storage/pdfViewer",
                            params: { uri: item.uri },
                          })
                        }
                        compact
                      >
                        View
                      </Button>
                    </View>
                  );
                } else if (typeof item === "object") {
                  return (
                    <Text key={idx} style={styles.value}>
                      {JSON.stringify(item)}
                    </Text>
                  );
                } else {
                  return (
                    <Text key={idx} style={styles.value}>
                      {item}
                    </Text>
                  );
                }
              })
            ) : typeof field.value === "object" && field.value !== null ? (
              Object.entries(field.value).map(([key, val], idx) => (
                <Text key={idx} style={styles.value}>{`${key}: ${val}`}</Text>
              ))
            ) : (
              <Text style={styles.value}>{field.value}</Text>
            )}
            <Divider style={styles.divider} />
          </View>
        ))}
      </Card.Content>
      {canEdit() && (
  <Card.Actions>
    <Button
      mode="outlined"
      onPress={() =>
        router.push({
          pathname: editRoute,
          params: { returnTo: "/landform/Preview" },
        })
      }
    >
      Edit
    </Button>
  </Card.Actions>
)}
    </Card>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton icon="arrow-left" size={24} style={styles.backButton} onPress={() => router.back()} />
      <Text style={styles.title}>Land Form</Text>

      <View style={styles.farmerPhotoContainer}>
        {selectedForm?.bankDetails?.submittedFiles?.farmerPhoto?.uri ? (
          <Image
            source={{ uri: selectedForm.bankDetails.submittedFiles.farmerPhoto.uri }}
            style={styles.farmerPhoto}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.noPhotoText}>Add a farmer photo</Text>
        )}
      </View>

      {renderSection("Basic Details", [
        { label: "1. Name of Farmer", value: selectedForm.basicDetails?.name },
        { label: "1-2. Age", value: selectedForm.basicDetails?.age },
        { label: "2. Mobile Number", value: selectedForm.basicDetails?.mobile },
        { label: "3. District", value: selectedForm.basicDetails?.district },
        { label: "4. Block", value: selectedForm.basicDetails?.block },
        { label: "5. Panchayat", value: selectedForm.basicDetails?.panchayat },
        { label: "6. Hamlet", value: selectedForm.basicDetails?.hamlet},
        { label: "6. Identity Card", value: selectedForm.basicDetails?.idCardType },
        { label: "7. ID Card Number", value: selectedForm.basicDetails?.idCardNumber },
        { label: "8. Gender", value: selectedForm.basicDetails?.gender },
        { label: "9. Father / Spouse Name", value: selectedForm.basicDetails?.fatherSpouse },
        { label: "10. Type of Household", value: selectedForm.basicDetails?.householdType },
        { label: "11. Household Members - Adults", value: selectedForm.basicDetails?.hhcombined},
        { label: "    Household Members - Children", value: selectedForm.basicDetails?.children },
      { label: "12. Occupation of Household Members", value: selectedForm.basicDetails?.occupationCombined },
        { label: "13. Special Category", value: selectedForm.basicDetails?.specialCategory ? "Yes" : "No" },
        { label: "    Special Category Number", value: selectedForm.basicDetails?.specialCategoryNumber },
        { label: "14. Caste", value: selectedForm.basicDetails?.caste },
        { label: "15. House Ownership", value: selectedForm.basicDetails?.houseOwnership },
        { label: "16. Type of House", value: selectedForm.basicDetails?.houseType },
        { label: "17. Drinking Water Source", value: selectedForm.basicDetails?.drinkingWaterCombined },
        { label: "18. Potability", value: selectedForm.basicDetails?.potabilityCombined },
        { label: "19. Domestic Water Source", value: selectedForm.basicDetails?.domesticWaterCombined },
        { label: "20. Toilet Availability", value: selectedForm.basicDetails?.toiletAvailability },
        { label: "21. Toilet Condition", value: selectedForm.basicDetails?.toiletCondition },
        { label: "22. Education of Householder", value: selectedForm.basicDetails?.education },
      ], "/landform/basicDetails")}

      {renderSection("Land Ownership & Livestock", [
        { label: "23. Land Ownership", value: selectedForm.landOwnership?.landOwnershipType },
        { label: "24. Well for Irrigation", value: selectedForm.landOwnership?.hasWell },
        { label: "    Area Irrigated (ha)", value: selectedForm.landOwnership?.areaIrrigated },
      { label: "25. Irrigated Lands (ha)", value: selectedForm.landOwnership?.irrigatedLandCombined },
        { label: "26. Patta Number", value: selectedForm.landOwnership?.pattaNumber },
        { label: "27. Total Area (ha)", value: selectedForm.landOwnership?.totalArea },
        { label: "27-28. Taluk", value: selectedForm.landOwnership?.taluk },
        { label: "27-28. Firka", value: selectedForm.landOwnership?.firka},
        { label: "28. Revenue Village", value: selectedForm.landOwnership?.revenueVillage },
        { label: "29. Crop Season", value: selectedForm.landOwnership?.cropSeasonCombined},
        { label: "30. LiveStocks",value: selectedForm.landOwnership?.livestockCombined },
        { label: " Goat", value: selectedForm.landOwnership?.livestock?.goat || "0" },
        { label: "    Sheep", value: selectedForm.landOwnership?.livestock?.sheep || "0" },
        { label: "    Milch Animals :", value: selectedForm.landOwnership?.livestock?.milchAnimals || "0" },
        { label: "    Draught Animals :", value: selectedForm.landOwnership?.livestock?.draught_animals || "0" },
        { label: "    Poultry :", value: selectedForm.landOwnership?.livestock?.poultry || "0" },
        { label: "    Others :", value: selectedForm.landOwnership?.livestock?.others || "0" },
      ], "/landform/landOwnership")}

      {renderSection("Land Development Details", [
        { label: "31. S.F. No.", value: selectedForm.landDevelopment?.sfNumber },
        { label: "31.a) Latitude", value: selectedForm.landDevelopment?.latitude },
        { label: "      Longitude", value: selectedForm.landDevelopment?.longitude },
        { label: "32. Soil Type", value: selectedForm.landDevelopment?.soilTypeCombined },
        { label: "33. Land to benefit (ha)", value: selectedForm.landDevelopment?.landBenefit },
        { label: "34. Field Inspection done by", value: selectedForm.landDevelopment?.inspectionBy },
        { label: "35. Site Approved by", value: selectedForm.landDevelopment?.approvedBy },
        { label: "36. Date of Inspection", value: selectedForm.landDevelopment?.dateInspectionText },
        { label: "37. Date of Approval", value: selectedForm.landDevelopment?.dateApprovalText },
        { label: "38. Type of work proposed", value: selectedForm.landDevelopment?.workTypeCombined },
        { label: "    Details about work types", value: selectedForm.landDevelopment?.workTypeText },
        { label: "39. Area benefited (ha)", value: selectedForm.landDevelopment?.proposalArea },
        { label: "40. Any other works proposed", value: selectedForm.landDevelopment?.otherWorks },
        { label: "41. PRADAN Contribution", value: selectedForm.landDevelopment?.pradanContribution },
        { label: "42. Farmer Contribution", value: selectedForm.landDevelopment?.farmerContribution },
        { label: "43. Total Estimate Amount", value: selectedForm.landDevelopment?.totalEstimate },
      ], "/landform/landDevelopment")}

      {renderSection("Bank Details", [
        { label: "44. Name of Account Holder", value: selectedForm.bankDetails?.accountHolderName },
        { label: "45. Account Number", value: selectedForm.bankDetails?.accountNumber },
        { label: "46. Name of the Bank", value: selectedForm.bankDetails?.bankName },
        { label: "47. Branch", value: selectedForm.bankDetails?.branch },
        { label: "48. IFSC", value: selectedForm.bankDetails?.ifscCode },
        { label: "49. Farmer has agreed for the work and his contribution", value: selectedForm.bankDetails?.farmerAgreed },
        {
          label: "50. Files submitted",
          value:
            selectedForm.bankDetails?.submittedFiles &&
            Object.values(selectedForm.bankDetails.submittedFiles).some(Boolean)
              ? Object.entries(selectedForm.bankDetails.submittedFiles)
                  .filter(([_, val]) => !!val)
                  .map(([key, val]) => ({
                    label: `${key}: ${val.name}`,
                    uri: val.uri,
                  }))
              : ["No files uploaded"],
        },
        { label: "Form Status", value: selectedForm.bankDetails?.formStatus },
      ], "/landform/bankDetails")}

      {!isSubmittedPreview && (
        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Submit
        </Button>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  farmerPhoto: {
    width: 170,
    height: 180,
    position: "absolute",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 2,
  },
  farmerPhotoContainer: {
    position: "absolute",
    top: 80,
    right: 30,
    width: 170,
    height: 180,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  
  noPhotoText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    marginLeft: 10,
  },
  divider: {
    marginVertical: 5,
  },
  submitButton: {
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
});