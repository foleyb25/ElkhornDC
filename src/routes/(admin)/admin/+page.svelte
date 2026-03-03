<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Dashboard | Elkhorn Admin</title>
</svelte:head>

<div>
	<h1 class="font-heading text-3xl text-charcoal">Dashboard</h1>
	<p class="mt-1 text-charcoal-light">Welcome to the Elkhorn Dog Chews admin panel.</p>

	<div class="mt-8 grid gap-6 sm:grid-cols-3">
		<div class="rounded-xl bg-white p-6 shadow-sm">
			<p class="text-sm font-medium text-charcoal-light">Total Products</p>
			<p class="mt-2 text-3xl font-bold text-charcoal">{data.totalProducts}</p>
		</div>
		<div class="rounded-xl bg-white p-6 shadow-sm">
			<p class="text-sm font-medium text-charcoal-light">Active Products</p>
			<p class="mt-2 text-3xl font-bold text-forest-600">{data.activeProducts}</p>
		</div>
		<div class="rounded-xl bg-white p-6 shadow-sm">
			<p class="text-sm font-medium text-charcoal-light">New Inquiries</p>
			<p class="mt-2 text-3xl font-bold text-bark-600">{data.newInquiries}</p>
		</div>
	</div>

	<div class="mt-8">
		<a
			href="/admin/products"
			class="inline-flex items-center gap-2 rounded-lg bg-bark-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-bark-700"
		>
			Manage Products
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5l7 7-7 7"
				/>
			</svg>
		</a>
	</div>
</div>
