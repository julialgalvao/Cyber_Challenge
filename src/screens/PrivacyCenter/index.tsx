import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, ScrollView } from "react-native";
import { getConsent, setConsent, hasConsent } from "../../privacy/consent";
import { exportUserData, deleteUserData } from "../../privacy/dsr";
import { getAudit } from "../../privacy/audit";

export default function PrivacyCenter() {
  const [consent, setLocalConsent] = useState<any>(null);
  useEffect(() => {
    getConsent().then(setLocalConsent);
  }, []);

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Privacy Center</Text>
      <Text>Gerencie consentimento, exportação e exclusão de dados.</Text>

      <View style={{ marginTop: 12 }}>
        <Text>
          Consentimento atual: {consent?.accepted ? "Aceito" : "Não aceito"}
        </Text>
        <Button
          title="Aceitar (v1)"
          onPress={async () => {
            await setConsent(true, 1);
            setLocalConsent(await getConsent());
          }}
        />
        <Button
          title="Revogar"
          onPress={async () => {
            await setConsent(false, 1);
            setLocalConsent(await getConsent());
          }}
        />
      </View>

      <View style={{ marginTop: 12 }}>
        <Button
          title="Exportar meus dados"
          onPress={async () => {
            const path = await exportUserData();
            Alert.alert("Exportação concluída", `Arquivo em: ${path}`);
          }}
        />
        <Button
          title="Excluir meus dados"
          color="#b00"
          onPress={async () => {
            await deleteUserData();
            Alert.alert("Dados excluídos");
          }}
        />
      </View>

      <View style={{ marginTop: 12 }}>
        <Button
          title="Ver auditoria (console)"
          onPress={async () => {
            const events = await getAudit();
            console.log("AUDIT_EVENTS", events);
            Alert.alert("Veja o console para os eventos");
          }}
        />
      </View>
    </ScrollView>
  );
}
