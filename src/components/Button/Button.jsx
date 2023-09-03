import { LoadMoreButton } from './Button.styled'; // Імпортуємо оновлені стилі

export function Button({ onClick }) {
  return <LoadMoreButton onClick={onClick}>Load more</LoadMoreButton>;
}
