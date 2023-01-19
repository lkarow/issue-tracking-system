import { useState } from "react";

export default function useSnackBar() {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => setIsShowing(!isShowing);

  return [isShowing, toggle];
}
