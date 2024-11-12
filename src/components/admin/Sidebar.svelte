<script lang="ts">
  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: 'home' },
    { name: 'Posts', href: '/admin/posts', icon: 'document-text' },
    { name: 'Media', href: '/admin/media', icon: 'photograph' },
    { name: 'Categories', href: '/admin/categories', icon: 'folder' },
    { name: 'Settings', href: '/admin/settings', icon: 'cog' }
  ];
</script>

<aside class="w-64 bg-gray-800">
  <div class="flex items-center justify-center h-16 bg-gray-900">
    <span class="text-white font-bold text-xl">Admin</span>
  </div>

  <nav class="mt-5">
    {#each menuItems as item}
      <a
        href={item.href}
        class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        <span class="mx-3">{item.name}</span>
      </a>
    {/each}
  </nav>
</aside>
