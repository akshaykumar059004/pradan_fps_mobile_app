import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { Checkbox, Button, IconButton } from "react-native-paper";
import { useFormStore } from "../../storage/useFormStore";

export default function LandOwnership() {
  const router = useRouter();
  const { data, setData } = useFormStore();

  const [form, setForm] = useState(
    data.landOwnership || {
      landOwnershipType: "",
      hasWell: "",
      areaIrrigated: "",
      irrigatedLand: {
        rainfed: "",
        tankfed: "",
        wellIrrigated: "",
      },
      pattaNumber: "",
      totalArea: "",
      taluk:"",
      firka:"",
      revenueVillage: "",
      cropSeason: [],
      livestock: {
        goat:"",
        sheep:"",
        milchAnimals:"",
        draught_animals:"",
        poultry:"",
        others:"",
      },
    }
  );

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const toggleCheckbox = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value],
    }));
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
    setData("landOwnership", form);
    router.push("./landDevelopment");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <IconButton
        icon="arrow-left"
        size={24}
        // style={styles.backButton}
        onPress={() => router.back()}
      />
      <Text style={styles.title}>Pond Form</Text>
      <Text style={styles.subtitle}>Land Ownership & Livestock</Text>

      <Text style={styles.question}>23. Land Ownership:</Text>
      {["Owner Cultivator", "Lease Holder"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.landOwnershipType === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, landOwnershipType: item })}
        />
      ))}

      <Text style={styles.question}>24. Well for Irrigation:</Text>
      {["Yes", "No"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.hasWell === item ? "checked" : "unchecked"}
          onPress={() => setForm({ ...form, hasWell: item })}
        />
      ))}

      {form.hasWell === "Yes" && (
        <>
          <Text style={styles.question}>Area Irrigated (ha):</Text>
          <TextInput
            value={form.areaIrrigated}
            onChangeText={(text) => setForm({ ...form, areaIrrigated: text })}
            style={styles.input}
            keyboardType="numeric"
          />
        </>
      )}

      <Text style={styles.question}>25. Irrigated Lands (ha):</Text>
      <Text>Rainfed:</Text>
      <TextInput
        value={form.irrigatedLand.rainfed}
        onChangeText={(text) =>
          setForm({ ...form, irrigatedLand: { ...form.irrigatedLand, rainfed: text } })
        }
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Tankfed:</Text>
      <TextInput
        value={form.irrigatedLand.tankfed}
        onChangeText={(text) =>
          setForm({ ...form, irrigatedLand: { ...form.irrigatedLand, tankfed: text } })
        }
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Well Irrigated:</Text>
      <TextInput
        value={form.irrigatedLand.wellIrrigated}
        onChangeText={(text) =>
          setForm({ ...form, irrigatedLand: { ...form.irrigatedLand, wellIrrigated: text } })
        }
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.question}>26. Patta Number:</Text>
      <TextInput
        value={form.pattaNumber}
        onChangeText={(text) => setForm({ ...form, pattaNumber: text })}
        style={styles.input}
      />

      <Text style={styles.question}>27. Total Area (ha):</Text>
      <TextInput
        value={form.totalArea}
        onChangeText={(text) => setForm({ ...form, totalArea: text })}
        style={styles.input}
        keyboardType="numeric"
      />
       <Text style={styles.question}>27-28. Taluk:</Text>
            <TextInput
              value={form.taluk}
              onChangeText={(text) => updateField("taluk", text)}
              style={styles.input}
            />
      <Text style={styles.question}>27-28. Firka:</Text>
            <TextInput
              value={form.firka}
              onChangeText={(text) => updateField("firka", text)}
              style={styles.input}
            />
      
      <Text style={styles.question}>28. Revenue Village:</Text>
      <TextInput
        value={form.revenueVillage}
        onChangeText={(text) => setForm({ ...form, revenueVillage: text })}
        style={styles.input}
      />

      <Text style={styles.question}>29. Crop Season:</Text>
      {["Kharif", "Rabi", "Other"].map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={form.cropSeason.includes(item) ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox("cropSeason", item)}
        />
      ))}

          <Text style={styles.question}>30. Livestock at Home:</Text>
      
      <TextInput
        placeholder="Goat"
        value={form.livestock.goat}
        onChangeText={(text) => updateNestedField("livestock","goat", text)}
        onBlur={() => {
          if (form.livestock.goat === "") {
            updateNestedField("livestock", "goat", "0");
          }
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Sheep"
        value={form.livestock.sheep}
        onChangeText={(text) => updateNestedField("livestock","sheep", text)}
        onBlur={() => {
          if (form.livestock.sheep === "") {
            updateNestedField("livestock", "sheep", "0");
          }
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Milch animals"
        value={form.livestock.milchAnimals}
        onChangeText={(text) => updateNestedField("livestock","milchAnimals", text)}
        onBlur={() => {
          if (form.livestock.milchAnimals === "") {
            updateNestedField("livestock", "milchAnimals", "0");
          }
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Draught Animals"
        value={form.livestock.draught_animals}
        onChangeText={(text) => updateNestedField("livestock","draught_animals", text)}
        onBlur={() => {
          if (form.livestock.draught_animals === "") {
            updateNestedField("livestock", "draught_animals", "0");
          }
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Poultry"
        value={form.livestock.poultry}
        onChangeText={(text) => updateNestedField("livestock","poultry", text)}
        onBlur={() => {
          if (form.livestock.poultry === "") {
            updateNestedField("livestock", "poultry", "0");
          }
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Others"
        value={form.livestock.others}
        onChangeText={(text) => updateNestedField("livestock","others", text)}
        onBlur={() => {
          if (form.livestock.others === "") {
            updateNestedField("livestock", "others", "0");
          }
        }}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleNext} style={styles.button}>
        Next
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 20 },
  question: { fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { marginTop: 20 },
});