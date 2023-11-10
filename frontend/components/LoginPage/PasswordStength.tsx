import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

// Password strength requirements, source: https://www.linkedin.com/pulse/guide-how-check-password-strength-react-materialui-brito-bittencourt/
const atLeastMinLength = (password: string) => new RegExp("^(?=.{8,})").test(password);
const atLeastOneUppercaseLetter = (password: string) => new RegExp("^(?=.*[A-Z])").test(password);
const atLeastOneLowercaseLetter = (password: string) => new RegExp("^(?=.*[a-z])").test(password);
const atLeastOneNumber = (password: string) => new RegExp("^(?=.*[0-9])").test(password);
const atLeastOneSpecialCharacter = (password: string) => new RegExp("^(?=.*[ !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])").test(password);

export enum PasswordStrength {
  STRONG = "strong",
  MEDIUM = "medium",
  WEAK = "weak",
}

export function testPasswordStrength(password?: string) : PasswordStrength {
  if (!password) {
    return PasswordStrength.WEAK;
  }
  let points = 0;
  if (atLeastMinLength(password)) {
    points++;
  }
  if (atLeastOneUppercaseLetter(password)) {
    points++;
  }
  if (atLeastOneLowercaseLetter(password)) {
    points++;
  }
  if (atLeastOneNumber(password)) {
    points++;
  }
  if (atLeastOneSpecialCharacter(password)) {
    points++;
  }
  if (points >= 5) {
    return PasswordStrength.STRONG;
  } else if (points >= 3) {
    return PasswordStrength.MEDIUM;
  } else {
    return PasswordStrength.WEAK;
  }
}

function getIcon(strength: PasswordStrength) {
  let icon = ErrorOutlineIcon;
  switch (strength) {
    case PasswordStrength.STRONG:
      icon = CheckOutlinedIcon;
      break;
    case PasswordStrength.MEDIUM:
      icon = ErrorOutlineIcon;
      break;
    case PasswordStrength.WEAK:
      icon = ErrorOutlineIcon;
      break;
  }
  return icon;
}

function generateColours(strength: PasswordStrength): string[] {
  let result: string[] = [];
  const colours = {
    NEUTRAL: "#9e9e9e",
    WEAK: "#ff0000",
    MEDIUM: "#ffa500",
    STRONG: "#00ff00",
  };
  switch (strength) {
    case PasswordStrength.STRONG:
      result = [colours.STRONG, colours.STRONG, colours.STRONG, colours.STRONG, colours.STRONG];
      break;
    case PasswordStrength.MEDIUM:
      result = [colours.MEDIUM, colours.MEDIUM, colours.MEDIUM, colours.NEUTRAL, colours.NEUTRAL];
      break;
    case PasswordStrength.WEAK:
      result = [colours.WEAK, colours.NEUTRAL, colours.NEUTRAL, colours.NEUTRAL, colours.NEUTRAL];
      break;
  }
  return result;
}

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrengthCheck({ password }: PasswordStrengthProps) {
  const passwordStrength = testPasswordStrength(password);
  const Icon = getIcon(passwordStrength);
  const colors = generateColours(passwordStrength);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" gap="5px" margin="10px">
        {colors.map((color, index) => (
          <Box key={index} flex={1} height="5px" borderRadius="5px" bgcolor={color}></Box>
        ))}
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-start" gap="5px" margin="0 15px">
        <Icon htmlColor={colors[0]} />
        <Typography color={colors[0]}>{passwordStrength}</Typography>
      </Box>

      {passwordStrength !== PasswordStrength.STRONG && (
        <>
          <Typography variant="subtitle2" fontSize="1rem" color="text.secondary" margin="0 0 8px 0">
            Your password is not strong
          </Typography>
          <Typography variant="subtitle2" fontSize="14px" fontWeight={500} color="text.secondary" margin="0 0 24px 0">
            Include at least 8 characters, a number, a special character, an uppercase letter, and a lowercase letter
          </Typography>
        </>
      )}
    </>
  );
}