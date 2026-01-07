<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow px-10 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-blue-600">ระบบประเมินผลบุคลากร</h1>
    </header>

    <!-- Filter -->
    <section class="flex gap-4 justify-center py-6">
      <select v-model="selectedPeriod" class="border rounded-lg px-4 py-2">
        <option value="">-- รอบประเมิน --</option>
        <option value="รอบที่ 1/2568">รอบที่ 1/2568</option>
        <option value="รอบที่ 2/2568">รอบที่ 2/2568</option>
      </select>

      <select v-model="selectedDept" class="border rounded-lg px-4 py-2">
        <option value="">-- ทุกแผนก --</option>
        <option v-for="d in departments" :key="d" :value="d">
          {{ d }}
        </option>
      </select>

      <input
        v-model="search"
        type="text"
        placeholder="ค้นหาชื่อบุคลากร"
        class="border rounded-lg px-4 py-2 w-64"
      />
    </section>

    <!-- Card List -->
    <section class="px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="u in filteredUsers"
        :key="u.id"
        class="bg-white rounded-2xl p-6 shadow"
      >
        <h3 class="text-lg font-semibold">{{ u.name }}</h3>
        <p class="text-gray-600 text-sm">{{ u.department }}</p>

        <span class="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {{ u.period }}
        </span>

        <div class="mt-4 flex justify-end">
          <router-link
            :to="`/evaluator/assignments/${u.id}`"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            ประเมิน
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const users = ref([]);
const search = ref("");
const selectedPeriod = ref("");
const selectedDept = ref("");

onMounted(async () => {
  const res = await fetch("https://dummyjson.com/users?limit=12");
  const data = await res.json();

  users.value = data.users.map((u) => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`,
    department: u.company?.department || "ไม่ระบุ",
    period: u.id % 2 === 0 ? "รอบที่ 1/2568" : "รอบที่ 2/2568",
  }));
});

const departments = computed(() => {
  return [...new Set(users.value.map((u) => u.department))];
});

const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    return (
      (!selectedPeriod.value || u.period === selectedPeriod.value) &&
      (!selectedDept.value || u.department === selectedDept.value) &&
      (!search.value || u.name.includes(search.value))
    );
  });
});
</script>
