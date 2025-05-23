import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, TextInput, Checkbox, Button, IconButton } from "react-native-paper";
import { useFormStore } from "../../storage/useFormStore";
import { useUserStore } from "@/storage/userDataStore";

export default function LandDevelopment() {
  const {user, setUser} = useUserStore();
  const router = useRouter();
  const { data, setData } = useFormStore();

  const [form, setForm] = useState(
    data.landDevelopment || {
      sfNumber: "12/21",
      soilTypeCombined: "",
      landBenefit: "1312",
      inspectionBy: "",
      approvedBy: "",
      dateInspectionText: "1232-12-12",
      dateApprovalText: "1212-12-11",
      workTypeCombined: "",
      workTypeText: "aefwefegwgwgrgw",
      proposalArea: "1678",
      otherWorks: "",
      latitude: "1213",
      longitude: "12121",
      pradanContribution: "1212",
      farmerContribution: "1212",
      totalEstimate: "121212",
    }
  );

  const updateField = (field: string, value: any) => {
    
    setForm((prev) => ({ ...prev, [field]: value }));
  };

 const toggleCheckbox = (field: string, value: string) => {
    setForm((prev) => {
      const currentValue = typeof prev[field] === "string" ? prev[field] : "";
      const current = currentValue.split(",").filter(Boolean); // removes empty strings
  
      let updated;
      if (current.includes(value)) {
        updated = current.filter((item) => item !== value);
      } else {
        updated = [...current, value];
      }
  
      return {
        ...prev,
        [field]: updated.join(","),
      };
    });
  };
  

  const renderCheckboxGroup = (
    field: string,
    options: string[],
    isSingle: boolean = false
  ) =>
    options.map((item) => (
      <Checkbox.Item
        key={item}
        label={item}
        status={
          isSingle
            ? form[field] === item
              ? "checked"
              : "unchecked"
            : form[field].includes(item)
            ? "checked"
            : "unchecked"
        }
        onPress={() =>
          isSingle ? updateField(field, item) : toggleCheckbox(field, item)
        }
      />
    ));

    const handleNext = () => {
      setData("landDevelopment", form);
      setData("username",user?.username);
      setData("formType", "LAND");
      setTimeout(() => {
        router.push("./bankDetails");
      }, 50); // 100ms delay is usually enough
    };
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />

      <Text style={styles.title}>Land Form</Text>
      <Text style={styles.subtitle}>Land Development Details</Text>

      <Text style={styles.question}>31. S.F. No. of the land to be developed:</Text>
      <TextInput
        value={form.sfNumber}
        onChangeText={(text) => updateField("sfNumber", text)}
        style={styles.input}
      />

      <Text style={styles.question}>31.a) Latitude and Longitude:</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 5 }]}
          placeholder="Latitude"
          value={form.latitude}
          onChangeText={(text) => updateField("latitude", text)}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { flex: 1, marginLeft: 5 }]}
          placeholder="Longitude"
          value={form.longitude}
          onChangeText={(text) => updateField("longitude", text)}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.question}>32. Soil Type:</Text>
      {renderCheckboxGroup("soilTypeCombined", ["Red Soil", "Black Cotton", "Sandy Loam", "Laterite"])}

      <Text style={styles.question}>33. Land to benefit (ha):</Text>
      <TextInput
        value={form.landBenefit}
        onChangeText={(text) => updateField("landBenefit", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>34. Field Inspection done by:</Text>
      {renderCheckboxGroup("inspectionBy", ["Associate", "Professional"], true)}

      <Text style={styles.question}>35. Site Approved by:</Text>
      {renderCheckboxGroup("approvedBy", ["Coordinator", "Team Leader"], true)}

      <Text style={styles.question}>36. Date of Inspection:</Text>
      <TextInput
        value={form.dateInspectionText}
        onChangeText={(text) => updateField("dateInspectionText", text)}
        style={styles.input}
        placeholder="DD/MM/YYYY"
      />

      <Text style={styles.question}>37. Date of Approval:</Text>
      <TextInput
        value={form.dateApprovalText}
        onChangeText={(text) => updateField("dateApprovalText", text)}
        style={styles.input}
        placeholder="DD/MM/YYYY"
      />

      <Text style={styles.question}>38. Type of work proposed:</Text>
      {renderCheckboxGroup("workTypeCombined", [
        "Prosopis removal",
        "Redevelopment of eroded lands",
        "Silt application",
        "Other",
      ])}

      <TextInput
        value={form.workTypeText}
        onChangeText={(text) => updateField("workTypeText", text)}
        style={styles.input}
        placeholder="Details about work types"
      />

      <Text style={styles.question}>39. Area benefited by proposal works (ha):</Text>
      <TextInput
        value={form.proposalArea}
        onChangeText={(text) => updateField("proposalArea", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>40. Any other works:</Text>
      <TextInput
        value={form.otherWorks}
        onChangeText={(text) => updateField("otherWorks", text)}
        style={styles.input}
        placeholder="Mention if any"
      />

      <Text style={styles.question}>41. PRADAN Contribution (Rs):</Text>
      <TextInput
        value={form.pradanContribution}
        onChangeText={(text) => updateField("pradanContribution", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>42. Farmer Contribution (Rs):</Text>
      <TextInput
        value={form.farmerContribution}
        onChangeText={(text) => updateField("farmerContribution", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>43. Total Estimate (Rs):</Text>
      <TextInput
        value={form.totalEstimate}
        onChangeText={(text) => updateField("totalEstimate", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button mode="contained" onPress={handleNext} style={styles.button}>
        Next
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 20 },
  question: { fontWeight: "bold", marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: { marginTop: 20 },
});