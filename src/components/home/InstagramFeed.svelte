<script lang="ts">
	import Container from '../ui/Container.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';
	import type { InstagramPost } from '$lib/server/instagram';

	interface Props {
		posts: InstagramPost[];
	}

	let { posts }: Props = $props();

	let scrollContainer: HTMLDivElement | undefined = $state();
	let canScrollLeft = $state(false);
	let canScrollRight = $state(true);

	function updateScrollState() {
		if (!scrollContainer) return;
		canScrollLeft = scrollContainer.scrollLeft > 0;
		canScrollRight =
			scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 1;
	}

	function scroll(direction: 'left' | 'right') {
		if (!scrollContainer) return;
		const amount = scrollContainer.clientWidth * 0.6;
		scrollContainer.scrollBy({
			left: direction === 'left' ? -amount : amount,
			behavior: 'smooth'
		});
	}

	function truncateCaption(caption: string, maxLength = 80): string {
		if (!caption) return '';
		if (caption.length <= maxLength) return caption;
		return caption.slice(0, maxLength).trimEnd() + '...';
	}
</script>

{#if posts.length > 0}
	<section class="py-16">
		<Container>
			<SectionHeading
				title="Follow Along"
				subtitle="See the latest from our pack on Instagram."
			/>

			<div class="relative mt-12">
				<!-- Scroll buttons -->
				{#if canScrollLeft}
					<button
						onclick={() => scroll('left')}
						class="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-bark-50"
						aria-label="Scroll left"
					>
						<svg class="h-5 w-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
				{/if}
				{#if canScrollRight}
					<button
						onclick={() => scroll('right')}
						class="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-bark-50"
						aria-label="Scroll right"
					>
						<svg class="h-5 w-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				{/if}

				<!-- Carousel -->
				<div
					bind:this={scrollContainer}
					onscroll={updateScrollState}
					class="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
					style="scrollbar-width: none; -ms-overflow-style: none;"
				>
					{#each posts as post}
						<a
							href={post.permalink}
							target="_blank"
							rel="noopener noreferrer"
							class="group w-64 flex-shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
						>
							<div class="aspect-square overflow-hidden bg-bark-100">
								<img
									src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
									alt={post.caption ? truncateCaption(post.caption, 100) : 'Instagram post'}
									class="h-full w-full object-cover transition-transform group-hover:scale-105"
								/>
								{#if post.media_type === 'VIDEO'}
									<div class="absolute inset-0 flex items-center justify-center">
										<div class="rounded-full bg-black/40 p-3">
											<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
												<path d="M8 5v14l11-7z" />
											</svg>
										</div>
									</div>
								{/if}
							</div>
							{#if post.caption}
								<div class="p-3">
									<p class="text-sm text-charcoal-light line-clamp-2">{truncateCaption(post.caption)}</p>
								</div>
							{/if}
						</a>
					{/each}
				</div>
			</div>

			<!-- Instagram CTA -->
			<div class="mt-8 text-center">
				<a
					href="https://instagram.com"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 text-sm font-medium text-charcoal-light transition-colors hover:text-charcoal"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
					</svg>
					Follow us on Instagram
				</a>
			</div>
		</Container>
	</section>
{/if}
