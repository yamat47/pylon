type SearchFieldProps = {
  // The field's id, by which the site's script finds it.
  id: string;
  // The name the words are sent under when the form is submitted without a script (`?q=`).
  name: string;
  // What the field is for, said to a reader who cannot see it.
  label: string;
  // The same, shown in the field while it is empty: the only words a reader sees on it.
  placeholder: string;
};

export function SearchField({ id, name, label, placeholder }: SearchFieldProps) {
  return (
    <search>
      <form>
        <input
          className="py-search-field text-body"
          id={id}
          type="search"
          name={name}
          aria-label={label}
          placeholder={placeholder}
          autoComplete="off"
        />
      </form>
    </search>
  );
}
