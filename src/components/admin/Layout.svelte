<script lang="ts">
  import Sidebar from './Sidebar.svelte';

  export let title: string;
</script>

<div class="flex h-screen bg-gray-100">
  <Sidebar />

  <div class="flex-1 flex flex-col overflow-hidden">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold text-gray-900">
          {title}
        </h1>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto bg-gray-100 p-6">
      <div class="max-w-7xl mx-auto">
        <slot />
      </div>
    </main>
  </div>
</div>
