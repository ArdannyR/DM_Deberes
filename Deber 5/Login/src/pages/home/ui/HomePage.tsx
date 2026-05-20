import { useState, useMemo } from "react";
import {
  FlatList, Modal, Platform, Alert,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import LottieView from "lottie-react-native";
import {
  YStack, XStack, Text, Button, ScrollView,
  Spinner, Card,
} from "tamagui";
import { Input as TGInput } from "tamagui";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@/shared/ui/Input";
import { supabase } from "@/shared/api/supabase";
import { useSession } from "@/features/session/model/useSession";
import { useActivities, Activity } from "@/features/activities/model/useActivities";

const TYPE_CONFIG: Record<Activity["type"], { label: string; emoji: string }> = {
  deber:   { label: "Deber",   emoji: "📚" },
  taller:  { label: "Taller",  emoji: "🔧" },
  prueba:  { label: "Prueba",  emoji: "📝" },
  reunion: { label: "Reunión", emoji: "🤝" },
};

const TYPES = Object.entries(TYPE_CONFIG) as [Activity["type"], { label: string; emoji: string }][];

const formatDate = (date: Date) =>
  date.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) +
  " · " +
  date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

export const HomePage = () => {
  const { user, signOut } = useSession();
  const { activities, isLoading, createActivity, updateActivity, deleteActivity } = useActivities();

  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<Activity | null>(null);
  const [formSubject, setFormSubject] = useState("");
  const [formType, setFormType] = useState<Activity["type"]>("deber");
  const [formDeadline, setFormDeadline] = useState(new Date());

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("todos");

  const filteredActivities = useMemo(() => {
    return activities.filter((a) => {
      const matchesSubject = a.subject
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      const matchesType = filterType === "todos" || a.type === filterType;
      return matchesSubject && matchesType;
    });
  }, [activities, searchQuery, filterType]);

  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  const isSaving = createActivity.isPending || updateActivity.isPending;

  const handleSignOut = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: () => signOut() },
    ]);
  };

  const handleUpdatePassword = async () => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!regex.test(newPassword)) {
      Alert.alert(
        "Contraseña no válida",
        "Debe tener al menos 8 caracteres, una mayúscula y un carácter especial (!@#$%^&*)."
      );
      return;
    }
    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        Alert.alert("Error", error.message);
        return;
      }
      Alert.alert("Éxito", "Contraseña actualizada correctamente.");
      setIsPasswordModalVisible(false);
      setNewPassword("");
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "No se pudo actualizar la contraseña.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const openCreate = () => {
    setEditItem(null);
    setFormType("deber");
    setFormSubject("");
    setFormDeadline(new Date());
    setModalVisible(true);
  };

  const openEdit = (item: Activity) => {
    setEditItem(item);
    setFormType(item.type);
    setFormSubject(item.subject);
    setFormDeadline(new Date(item.deadline));
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!formSubject.trim()) {
      Alert.alert("Campo requerido", "La materia es obligatoria.");
      return;
    }
    try {
      if (editItem) {
        await updateActivity.mutateAsync({
          id: editItem.id,
          type: formType,
          subject: formSubject.trim(),
          deadline: formDeadline.toISOString(),
        });
      } else {
        await createActivity.mutateAsync({
          type: formType,
          subject: formSubject.trim(),
          deadline: formDeadline.toISOString(),
        });
      }
      setModalVisible(false);
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "No se pudo guardar.");
    }
  };

  const handleDelete = (item: Activity) => {
    Alert.alert("Eliminar", `¿Borrar "${item.subject}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Borrar", style: "destructive", onPress: () => deleteActivity.mutate(item.id) },
    ]);
  };

  const handleOpenPicker = () => {
    if (Platform.OS === "android") setPickerMode("date");
    setShowPicker(true);
  };

  const handlePickerChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (_event.type === "dismissed") {
      setShowPicker(false);
      return;
    }
    if (Platform.OS === "android") {
      if (pickerMode === "date") {
        if (selectedDate) {
          const updated = new Date(formDeadline);
          updated.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
          setFormDeadline(updated);
          setPickerMode("time");
        }
      } else {
        setShowPicker(false);
        if (selectedDate) {
          const updated = new Date(formDeadline);
          updated.setHours(selectedDate.getHours(), selectedDate.getMinutes());
          setFormDeadline(updated);
        }
      }
    } else {
      if (selectedDate) setFormDeadline(selectedDate);
    }
  };

  const renderCard = ({ item }: { item: Activity }) => {
    const config = TYPE_CONFIG[item.type];
    const date = new Date(item.deadline);
    return (
      <Card
        elevate
        padded
        size="$4"
        backgroundColor="$card"
        borderRadius={16}
        width={280}
        minHeight={200}
        marginVertical={8}
      >
        <YStack flex={1} gap={8} padding="$4">
          <XStack alignItems="center" gap={8}>
            <Text fontSize={24}>{config.emoji}</Text>
            <Text fontSize={12} fontWeight="700" color="$accent" textTransform="uppercase" letterSpacing={0.5}>
              {config.label}
            </Text>
          </XStack>
          <Text fontSize={16} fontWeight="700" color="$primary" numberOfLines={2}>
            {item.subject}
          </Text>
          <Text fontSize={12} color="$textMuted">
            {formatDate(date)}
          </Text>
          <YStack marginTop="auto" paddingTop={12} borderTopWidth={1} borderTopColor="$border" gap={6}>
            <XStack gap={12}>
              <Button
                flex={1}
                paddingVertical={10}
                backgroundColor="$accent"
                borderRadius={8}
                onPress={() => openEdit(item)}
              >
                <Text fontSize={13} fontWeight="700" color="#fff">Editar</Text>
              </Button>
              <Button
                flex={1}
                paddingVertical={10}
                backgroundColor="$danger"
                borderRadius={8}
                onPress={() => handleDelete(item)}
              >
                <Text fontSize={13} fontWeight="700" color="#fff">Eliminar</Text>
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </Card>
    );
  };

  const filterOptions = [
    { key: "todos", label: "Todos" },
    ...TYPES.map(([key, cfg]) => ({ key, label: cfg.label })),
  ] as const;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4FF" }}>
      <YStack flex={1} paddingVertical={24} paddingBottom={60}>

        {/* Header */}
        <YStack paddingHorizontal={24} marginBottom={32}>
          <Text fontSize={28} fontWeight="800" color="$primary">ESFOT Académico</Text>
          <Text fontSize={14} color="$textMuted" marginTop={4}>{user?.email}</Text>
        </YStack>

        {/* Section */}
        <YStack flex={1}>
          <Text fontSize={18} fontWeight="700" color="$textMid" paddingHorizontal={24} marginBottom={16}>
            Tus Actividades
          </Text>

          {/* Search */}
          <YStack paddingHorizontal={24} marginBottom={16}>
            <TGInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar por nombre de materia..."
              color="black"
              placeholderTextColor="#666666"
              backgroundColor="$inputBg"
              borderWidth={1.5}
              borderColor="$border"
              borderRadius={10}
              paddingHorizontal={16}
              paddingVertical={13}
              fontSize={15}
            />
          </YStack>

          {/* Filter chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 10, alignItems: "center" }}
            style={{ maxHeight: 50, marginBottom: 20 }}
          >
            {filterOptions.map(({ key, label }) => {
              const active = filterType === key;
              return (
                <Button
                  key={key}
                  backgroundColor={active ? "$primary" : "transparent"}
                  borderWidth={1.5}
                  borderColor={active ? "$primary" : "$border"}
                  borderRadius={20}
                  paddingHorizontal="$3"
                  paddingVertical={8}
                  onPress={() => setFilterType(key)}
                >
                  <Text
                    fontSize={12}
                    fontWeight="600"
                    color={active ? "#fff" : "$textMid"}
                  >
                    {label}
                  </Text>
                </Button>
              );
            })}
          </ScrollView>

          {/* Activities */}
          {isLoading ? (
            <YStack flex={1} alignItems="center" justifyContent="center" paddingTop={40}>
              <Spinner size="large" color="$primary" />
            </YStack>
          ) : (
            <FlatList
              data={filteredActivities}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24, gap: 16, paddingBottom: 20 }}
              renderItem={renderCard}
              ListEmptyComponent={
                <YStack alignItems="center" justifyContent="center" gap={12} paddingVertical={40} width="100%">
                  <LottieView
                    source={require("@/../assets/animations/empty.json")}
                    autoPlay
                    loop
                    style={{ width: 200, height: 200 }}
                  />
                  <Text fontSize={15} color="$textMuted" textAlign="center">
                    {searchQuery || filterType !== "todos"
                      ? "No hay actividades con esos filtros."
                      : "No hay actividades. ¡Crea una!"}
                  </Text>
                </YStack>
              }
            />
          )}
        </YStack>

        {/* Actions */}
        <YStack gap="$3" paddingBottom="$6" paddingHorizontal={24}>
          <Button
            width="100%"
            backgroundColor="$accent"
            borderRadius={12}
            onPress={openCreate}
          >
            <XStack gap={8} alignItems="center">
              <Ionicons name="add-circle" size={22} color="#fff" />
              <Text fontSize={12} fontWeight="700" color="#fff">Añadir Actividad</Text>
            </XStack>
          </Button>
          <XStack gap="$3" width="100%">
            <Button
              flex={1}
              backgroundColor="$primary"
              borderRadius={12}
              onPress={() => setIsPasswordModalVisible(true)}
            >
              <Text fontSize={12} fontWeight="700" color="#fff">Cambiar Contraseña</Text>
            </Button>
            <Button
              flex={1}
              backgroundColor="transparent"
              borderWidth={2}
              borderColor="$primary"
              borderRadius={12}
              onPress={handleSignOut}
            >
              <Text fontSize={12} fontWeight="600" color="$primary">Cerrar sesión</Text>
            </Button>
          </XStack>
        </YStack>

        {/* Modal */}
        <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
          <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4FF" }}>
            <YStack flex={1} padding="$5" gap="$4">
              <Text fontSize={22} fontWeight="800" color="$primary" textAlign="center" marginBottom={24}>
                {editItem ? "Editar Actividad" : "Nueva Actividad"}
              </Text>

              {/* Type selector */}
              <Text fontSize={14} fontWeight="600" color="$textMid" marginBottom={8}>
                Tipo de Actividad
              </Text>
              <XStack gap={10} marginBottom={20}>
                {TYPES.map(([key, cfg]) => {
                  const active = formType === key;
                  return (
                    <Button
                      key={key}
                      flexShrink={0}
                      flexDirection="column"
                      gap={4}
                      paddingVertical={10}
                      paddingHorizontal="$3"
                      borderRadius={10}
                      backgroundColor={active ? "#EFF6FF" : "$inputBg"}
                      borderWidth={1.5}
                      borderColor={active ? "$accent" : "$border"}
                      onPress={() => setFormType(key)}
                    >
                      <Text fontSize={16}>{cfg.emoji}</Text>
                      <Text
                        fontSize={12}
                        fontWeight="600"
                        color={active ? "$accent" : "$textMuted"}
                      >
                        {cfg.label}
                      </Text>
                    </Button>
                  );
                })}
              </XStack>

              {/* Subject */}
              <Input
                label="Materia"
                value={formSubject}
                onChangeText={setFormSubject}
                placeholder="Ej. Aplicaciones Distribuidas"
                autoCapitalize="sentences"
              />

              {/* Date/time picker */}
              <Text fontSize={14} fontWeight="600" color="$textMid" marginBottom={8} marginTop={12}>
                Fecha límite
              </Text>
              <Button
                flexDirection="row"
                alignItems="center"
                gap={10}
                borderWidth={1.5}
                borderColor="$border"
                borderRadius={10}
                paddingHorizontal={16}
                paddingVertical={12}
                backgroundColor="$inputBg"
                marginBottom={16}
                onPress={handleOpenPicker}
              >
                <Ionicons name="calendar-outline" size={20} color="#64748B" />
                <YStack flex={1}>
                  <Text fontSize={12} color="$textMuted" marginBottom={2}>Seleccionar Fecha/Hora</Text>
                  <Text fontSize={14} fontWeight="600" color="$text">{formatDate(formDeadline)}</Text>
                </YStack>
                <Ionicons name="chevron-down" size={18} color="#64748B" />
              </Button>

              {/* DateTimePicker — Android */}
              {showPicker && Platform.OS === "android" && (
                <DateTimePicker
                  value={formDeadline}
                  mode={pickerMode}
                  is24Hour
                  onChange={handlePickerChange}
                />
              )}

              {/* DateTimePicker — iOS */}
              {showPicker && Platform.OS === "ios" && (
                <YStack height={220} overflow="hidden" marginBottom={8}>
                  <DateTimePicker
                    value={formDeadline}
                    mode="datetime"
                    display="spinner"
                    is24Hour
                    onChange={handlePickerChange}
                  />
                </YStack>
              )}

              {/* Actions */}
              <XStack gap="$3" width="100%" marginTop="$5" justifyContent="space-between">
                <Button
                  flex={1}
                  backgroundColor="$primary"
                  borderRadius={12}
                  onPress={handleSave}
                  opacity={isSaving ? 0.5 : 1}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Spinner color="#fff" />
                  ) : (
                    <Text fontSize={12} fontWeight="700" color="#fff">
                      {editItem ? "Guardar Cambios" : "Crear"}
                    </Text>
                  )}
                </Button>
                <Button
                  flex={1}
                  backgroundColor="transparent"
                  borderWidth={2}
                  borderColor="$primary"
                  borderRadius={12}
                  onPress={() => setModalVisible(false)}
                >
                  <Text fontSize={12} fontWeight="600" color="$primary">Cancelar</Text>
                </Button>
              </XStack>
            </YStack>
          </SafeAreaView>
        </Modal>

        {/* Password Modal */}
        <Modal visible={isPasswordModalVisible} animationType="slide" presentationStyle="pageSheet">
          <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4FF" }}>
            <YStack flex={1} padding="$5" gap="$4">
              <Text fontSize={22} fontWeight="800" color="$primary" textAlign="center" marginBottom={24}>
                Cambiar Contraseña
              </Text>
              <Input
                label="Nueva Contraseña"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Nueva contraseña..."
                secureTextEntry
                isPassword
              />
              <Text fontSize={12} color="$textMuted" marginTop="$2">
                La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 carácter especial.
              </Text>
              <XStack gap="$3" width="100%" marginTop="$5" justifyContent="space-between">
                <Button
                  flex={1}
                  backgroundColor="$primary"
                  borderRadius={12}
                  onPress={handleUpdatePassword}
                  opacity={isUpdatingPassword ? 0.5 : 1}
                  disabled={isUpdatingPassword}
                >
                  {isUpdatingPassword ? (
                    <Spinner color="#fff" />
                  ) : (
                    <Text fontSize={12} fontWeight="700" color="#fff">Guardar</Text>
                  )}
                </Button>
                <Button
                  flex={1}
                  backgroundColor="transparent"
                  borderWidth={2}
                  borderColor="$primary"
                  borderRadius={12}
                  onPress={() => {
                    setIsPasswordModalVisible(false);
                    setNewPassword("");
                  }}
                >
                  <Text fontSize={12} fontWeight="600" color="$primary">Cancelar</Text>
                </Button>
              </XStack>
            </YStack>
          </SafeAreaView>
        </Modal>

      </YStack>
    </SafeAreaView>
  );
};
