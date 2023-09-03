import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(evt.target.elements.query.value);
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <span className="SearchForm-button-label"></span>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
      </SearchForm>
    </SearchbarContainer>
  );
}
