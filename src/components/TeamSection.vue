<template>
  <section id="team" class="py-20 bg-white">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Research Team</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        </p>
      </div>
      
      <!-- Team Statistics -->

      <!-- Featured Members Preview -->
      <div class="mb-16" v-if="teamData?.principals?.length > 0">
        <h3 class="text-2xl font-semibold text-gray-800 mb-8 text-center"></h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <a v-for="member in teamData.principals" :key="member.title" :href="member.url" class="card p-6 hover:shadow-xl transition-all duration-300 block group">
            <div class="flex items-start space-x-4">
              <img v-if="member.photo" 
                :src="member.photo" 
                :alt="member.title"
                class="w-24 h-24 rounded-full object-cover"
              />
              <div v-else class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {{ getInitials(member.title) }}
              </div>
              <div class="flex-1">
                <h4 class="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{{ member.title }}</h4>
                <p class="text-sm text-blue-600 mb-2">{{ member.position }}</p>
                <p v-if="member.research" class="text-sm text-gray-600">{{ member.research }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- Students Section -->
      <div class="mb-16" v-if="(teamData?.phdStudents?.length > 0) || (teamData?.mscStudents?.length > 0)">
        <h3 class="text-2xl font-semibold text-gray-800 mb-8 text-center">Graduate Students</h3>
        
        <!-- PhD Students -->
        <div v-if="teamData?.phdStudents?.length > 0" class="mb-8">
          <h4 class="text-lg font-medium text-gray-700 mb-4 text-center">PhD Students</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <a v-for="student in teamData.phdStudents.slice(0, 6)" 
               :key="student.title" 
               :href="student.url" 
               class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 hover:shadow-md transition-all duration-300 block group">
              <div class="flex items-center space-x-3">
                <img v-if="student.photo" 
                  :src="student.photo" 
                  :alt="student.title"
                  class="w-16 h-16 rounded-full object-cover"
                />
                <div v-else class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {{ getInitials(student.title) }}
                </div>
                <div class="flex-1">
                  <h5 class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{{ student.title }}</h5>
                  <p class="text-xs text-gray-600">{{ student.position }}</p>
                  <p v-if="student.research" class="text-xs text-gray-500 mt-1 line-clamp-2">{{ student.research }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        
        <!-- MSc Students -->
        <div v-if="teamData?.mscStudents?.length > 0">
          <h4 class="text-lg font-medium text-gray-700 mb-4 text-center">M.Sc. Students</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <a v-for="student in teamData.mscStudents" 
               :key="student.title" 
               :href="student.url" 
               class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 hover:shadow-md transition-all duration-300 block group">
              <div class="flex items-center space-x-3">
                <img v-if="student.photo" 
                  :src="student.photo" 
                  :alt="student.title"
                  class="w-16 h-16 rounded-full object-cover"
                />
                <div v-else class="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                  {{ getInitials(student.title) }}
                </div>
                <div class="flex-1">
                  <h5 class="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{{ student.title }}</h5>
                  <p class="text-xs text-gray-600">{{ student.position }}</p>
                  <p v-if="student.research" class="text-xs text-gray-500 mt-1 line-clamp-2">{{ student.research }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Research Areas -->
      <div class="mb-16">
        <h3 class="text-2xl font-semibold text-gray-800 mb-8 text-center">Research Expertise</h3>
        <div class="flex flex-wrap justify-center gap-3">
          <span class="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">Satellite Remote Sensing</span>
          <span class="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">Ocean Dynamics</span>
          <span class="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">Phytoplankton Ecology</span>
          <span class="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm">Eastern Mediterranean</span>
          <span class="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm">Submesoscale Processes</span>
          <span class="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm">Marine Aerosols</span>
          <span class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm">Ocean-Atmosphere Interactions</span>
          <span class="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm">Lagrangian Analysis</span>
          <span class="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm">Jellyfish Dynamics</span>
          <span class="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm">Oil Spill Detection</span>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <a href="/team" class="btn-primary inline-block">
          View Full Team Directory →
        </a>
        <p class="mt-4 text-gray-600">
          Explore detailed profiles of all team members, students, and alumni
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TeamMember {
  title: string;
  position: string;
  role: string;
  research?: string;
  email?: string;
  photo?: string;
  url?: string;
  order?: number;
}

interface TeamData {
  principals: TeamMember[];
  phdStudents: TeamMember[];
  mscStudents: TeamMember[];
}

const props = defineProps<{
  teamData: TeamData;
}>();

// Get initials from name
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('');
};
</script>

<style scoped>
</style>