<template>
  <section id="team" class="py-20 bg-white">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Research Team</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          A diverse group of scientists and students advancing marine remote sensing
        </p>
      </div>
      
      <!-- Team Statistics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
          <div class="text-3xl font-bold text-blue-600 mb-2">{{ teamData?.principals?.length || 0 }}</div>
          <div class="text-sm text-gray-600">Principal Investigators & Lab Manager</div>
        </div>
        <div class="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <div class="text-3xl font-bold text-green-600 mb-2">{{ teamData?.phdStudents?.length || 0 }}</div>
          <div class="text-sm text-gray-600">PhD Students</div>
        </div>
        <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
          <div class="text-3xl font-bold text-purple-600 mb-2">{{ teamData?.mscStudents?.length || 0 }}</div>
          <div class="text-sm text-gray-600">M.Sc. Students</div>
        </div>
        <div class="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
          <div class="text-3xl font-bold text-orange-600 mb-2">200+</div>
          <div class="text-sm text-gray-600">Alumni</div>
        </div>
      </div>

      <!-- Featured Members Preview -->
      <div class="mb-16" v-if="teamData?.principals?.length > 0">
        <h3 class="text-2xl font-semibold text-gray-800 mb-8 text-center">Lab Leadership</h3>
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

      <!-- Research Areas -->
      <div class="mb-16">
        <h3 class="text-2xl font-semibold text-gray-800 mb-8 text-center">Research Expertise</h3>
        <div class="flex flex-wrap justify-center gap-3">
          <span class="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">Ocean Color</span>
          <span class="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">Machine Learning</span>
          <span class="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">Climate Change</span>
          <span class="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm">Coastal Dynamics</span>
          <span class="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm">Marine Heatwaves</span>
          <span class="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm">HAB Detection</span>
          <span class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm">Satellite Altimetry</span>
          <span class="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm">Bio-Optics</span>
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