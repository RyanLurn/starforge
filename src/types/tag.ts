declare const __tags: unique symbol;

export type Tagged<T, Tags extends string> = {
  readonly [__tags]: { [K in Tags]: true };
} & T;

export type TagsOf<T> = T extends { readonly [__tags]: infer R } ? R : never;

export type AddTag<T, NewTag extends string> = Tagged<
  T,
  Extract<keyof TagsOf<T>, string> | NewTag
>;

export type HasTag<T, Tag extends string> = Tag extends keyof TagsOf<T>
  ? true
  : false;

export type RequireAllTags<
  T,
  Required extends string,
> = Required extends keyof TagsOf<T> ? T : never;

export type RequireAnyTag<T, Required extends string> = [
  Extract<Required, keyof TagsOf<T>>,
] extends [never]
  ? never
  : T;
