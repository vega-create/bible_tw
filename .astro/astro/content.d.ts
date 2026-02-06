declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"3個有效方法引導孩子深入討論聖經教義-ml7o8upr.md": {
	id: "3個有效方法引導孩子深入討論聖經教義-ml7o8upr.md";
  slug: "3個有效方法引導孩子深入討論聖經教義-ml7o8upr";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"5-個簡單方法讓你在忙碌生活中持續靈修-ml7z3icj.md": {
	id: "5-個簡單方法讓你在忙碌生活中持續靈修-ml7z3icj.md";
  slug: "5-個簡單方法讓你在忙碌生活中持續靈修-ml7z3icj";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"5個技巧幫你選擇適合全家一起參與的聖經故事-ml7o7qlb.md": {
	id: "5個技巧幫你選擇適合全家一起參與的聖經故事-ml7o7qlb.md";
  slug: "5個技巧幫你選擇適合全家一起參與的聖經故事-ml7o7qlb";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"5個關鍵技巧幫你挑選適合孩子的靈修書籍-ml7p80cr.md": {
	id: "5個關鍵技巧幫你挑選適合孩子的靈修書籍-ml7p80cr.md";
  slug: "5個關鍵技巧幫你挑選適合孩子的靈修書籍-ml7p80cr";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"how-to-pray.md": {
	id: "how-to-pray.md";
  slug: "how-to-pray";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"how-to-read-bible.md": {
	id: "how-to-read-bible.md";
  slug: "how-to-read-bible";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"主禱文的意義是什麼.md": {
	id: "主禱文的意義是什麼.md";
  slug: "主禱文的意義是什麼";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"什麼是三位一體.md": {
	id: "什麼是三位一體.md";
  slug: "什麼是三位一體";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"什麼是信心.md": {
	id: "什麼是信心.md";
  slug: "什麼是信心";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"什麼是恩典.md": {
	id: "什麼是恩典.md";
  slug: "什麼是恩典";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"什麼是救恩.md": {
	id: "什麼是救恩.md";
  slug: "什麼是救恩";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"什麼是聖靈.md": {
	id: "什麼是聖靈.md";
  slug: "什麼是聖靈";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"十誡是什麼.md": {
	id: "十誡是什麼.md";
  slug: "十誡是什麼";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"基督徒可以刺青嗎.md": {
	id: "基督徒可以刺青嗎.md";
  slug: "基督徒可以刺青嗎";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"基督徒可以吃血嗎.md": {
	id: "基督徒可以吃血嗎.md";
  slug: "基督徒可以吃血嗎";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"基督徒可以拜拜嗎.md": {
	id: "基督徒可以拜拜嗎.md";
  slug: "基督徒可以拜拜嗎";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"基督徒可以燒香嗎.md": {
	id: "基督徒可以燒香嗎.md";
  slug: "基督徒可以燒香嗎";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"基督徒可以算命嗎.md": {
	id: "基督徒可以算命嗎.md";
  slug: "基督徒可以算命嗎";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"基督徒可以離婚嗎.md": {
	id: "基督徒可以離婚嗎.md";
  slug: "基督徒可以離婚嗎";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何在困境中保持信心.md": {
	id: "如何在困境中保持信心.md";
  slug: "如何在困境中保持信心";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何在忙碌中親近神.md": {
	id: "如何在忙碌中親近神.md";
  slug: "如何在忙碌中親近神";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何培養靈修習慣.md": {
	id: "如何培養靈修習慣.md";
  slug: "如何培養靈修習慣";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何感受神的同在.md": {
	id: "如何感受神的同在.md";
  slug: "如何感受神的同在";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何知道神的旨意.md": {
	id: "如何知道神的旨意.md";
  slug: "如何知道神的旨意";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何禱告.md": {
	id: "如何禱告.md";
  slug: "如何禱告";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何選擇教會.md": {
	id: "如何選擇教會.md";
  slug: "如何選擇教會";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何開始讀聖經-ml7nf4lr.md": {
	id: "如何開始讀聖經-ml7nf4lr.md";
  slug: "如何開始讀聖經-ml7nf4lr";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何面對失去親人的悲傷.md": {
	id: "如何面對失去親人的悲傷.md";
  slug: "如何面對失去親人的悲傷";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何面對焦慮.md": {
	id: "如何面對焦慮.md";
  slug: "如何面對焦慮";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"如何饒恕別人.md": {
	id: "如何饒恕別人.md";
  slug: "如何饒恕別人";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"忙碌生活中的靈修秘訣如何持續靈修不間斷-ml7p9bi9.md": {
	id: "忙碌生活中的靈修秘訣如何持續靈修不間斷-ml7p9bi9.md";
  slug: "忙碌生活中的靈修秘訣如何持續靈修不間斷-ml7p9bi9";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"忙碌生活也能靈修這些技巧讓你做到-ml7z4v4t.md": {
	id: "忙碌生活也能靈修這些技巧讓你做到-ml7z4v4t.md";
  slug: "忙碌生活也能靈修這些技巧讓你做到-ml7z4v4t";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"每日靈修5個最佳時間安排讓你靈性成長更快-ml90mate.md": {
	id: "每日靈修5個最佳時間安排讓你靈性成長更快-ml90mate.md";
  slug: "每日靈修5個最佳時間安排讓你靈性成長更快-ml90mate";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"為什麼好人也會遭遇苦難.md": {
	id: "為什麼好人也會遭遇苦難.md";
  slug: "為什麼好人也會遭遇苦難";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"為什麼要受洗.md": {
	id: "為什麼要受洗.md";
  slug: "為什麼要受洗";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"為什麼要讀聖經.md": {
	id: "為什麼要讀聖經.md";
  slug: "為什麼要讀聖經";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"登山寶訓的意義是什麼.md": {
	id: "登山寶訓的意義是什麼.md";
  slug: "登山寶訓的意義是什麼";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"詩篇23篇的含義是什麼.md": {
	id: "詩篇23篇的含義是什麼.md";
  slug: "詩篇23篇的含義是什麼";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"靈修如何改變媽媽的生活探索5大意想不到的好處-ml8yrs42.md": {
	id: "靈修如何改變媽媽的生活探索5大意想不到的好處-ml8yrs42.md";
  slug: "靈修如何改變媽媽的生活探索5大意想不到的好處-ml8yrs42";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"靈修對媽媽的5大好處你絕對想不到的轉變-ml8yrn66.md": {
	id: "靈修對媽媽的5大好處你絕對想不到的轉變-ml8yrn66.md";
  slug: "靈修對媽媽的5大好處你絕對想不到的轉變-ml8yrn66";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"饒恕的力量聖經教導讓你心靈釋放的5個真相-ml96ca84.md": {
	id: "饒恕的力量聖經教導讓你心靈釋放的5個真相-ml96ca84.md";
  slug: "饒恕的力量聖經教導讓你心靈釋放的5個真相-ml96ca84";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
