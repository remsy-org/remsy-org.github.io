<template>
  <section id="contact" class="py-20 bg-gray-50">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 heading-section">{{ contactData?.title || 'Get in Touch' }}</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto text-body">
          {{ contactData?.subtitle || 'Interested in our research or looking for collaboration opportunities? We\'d love to hear from you.' }}
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-1 gap-12 max-w-6xl mx-auto">
        <div class="space-y-8">
          <div class="card p-8">
            <h3 class="text-2xl font-semibold text-gray-900 mb-6 heading-subsection">Contact Information</h3>
            
            <div class="space-y-4">
              <div class="flex items-center items-start space-x-4">
                <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <h4 class="font-semibold text-gray-900 heading-small">Address</h4>
                  <p class="text-gray-600 text-body" v-if="contactData?.address">
                    {{ contactData.address.building }}, {{ contactData.address.room }}<br>
                    {{ contactData.address.institution }}<br>
                    {{ contactData.address.street }}<br>
                    {{ contactData.address.city }}, {{ contactData.address.postalCode }}<br>
                    {{ contactData.address.country }}
                  </p>
                  <p class="text-gray-600 text-body" v-else>
                    Marine Remote Sensing Laboratory<br>
                    Department of Marine Sciences<br>
                    University Campus, Building A<br>
                    Ocean View, State 12345
                  </p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <div>
                  <h4 class="font-semibold text-gray-900 heading-small">Email</h4>
                  <a :href="'mailto:' + (contactData?.email || 'info@marinesensinglab.edu')" class="text-blue-600 hover:underline">
                    {{ contactData?.email || 'info@marinesensinglab.edu' }}
                  </a>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <h4 class="font-semibold text-gray-900 heading-small">Phone</h4>
                  <p class="text-gray-600 text-body">{{ contactData?.phone || '+1 (555) 123-4567' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';

interface ContactData {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: {
    building: string;
    room: string;
    institution: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  officeHours?: string;
}

const props = defineProps<{
  contactData?: ContactData;
}>();

const socialLinks = computed(() => {
  if (props.contactData?.socialLinks) {
    return props.contactData.socialLinks;
  }
  return [
    { platform: 'github', url: '#' },
    { platform: 'linkedin', url: '#' },
    { platform: 'twitter', url: '#' }
  ];
});

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = () => {
  console.log('Form submitted:', form);
  alert('Thank you for your message! We will get back to you soon.');
  Object.keys(form).forEach(key => {
    form[key as keyof typeof form] = '';
  });
};
</script>

<style scoped>
label {
  font-family: var(--font-body);
  font-weight: 500;
}
</style>