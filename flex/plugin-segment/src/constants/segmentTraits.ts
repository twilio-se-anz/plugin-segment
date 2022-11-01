import { BadgeVariants } from "@twilio-paste/badge/dist/types";

export type KnownTrait = {
  key: string;
  label: string;
  display_value: boolean;
  variant: BadgeVariants;
  onlyIfTrue?: boolean;
};

export const KnownTraits: KnownTrait[] = [
  {
    key: "account_type",
    label: "Account Type",
    display_value: true,
    variant: "info",
  },
  {
    key: "pageUserIsOn",
    label: "User is on page",
    display_value: true,
    variant: "success",
  },
  {
    key: "ownr_ocpd_hm_lon_cstmr_ind",
    label: "Owner Occupied Home Loan",
    display_value: false,
    variant: "error",
    onlyIfTrue: true,
  },
  {
    key: "private_bank_prospects",
    label: "Private Banking Prospect",
    display_value: false,
    variant: "error",
    onlyIfTrue: true,
  },
  {
    key: "prsnl_bnkng_cstmr_ind",
    label: "Personalised Banking Customer",
    display_value: false,
    variant: "error",
    onlyIfTrue: true,
  },
  {
    key: "prvt_bnkng_cstmr_ind",
    label: "Private Banking Customer",
    display_value: false,
    variant: "error",
    onlyIfTrue: true,
  },

  {
    key: "invst_hm_lon_cstmr_ind",
    label: "Investment Homeloan Customer",
    display_value: false,
    variant: "error",
    onlyIfTrue: true,
  },
  {
    key: "website_leads",
    label: "Website Lead",
    display_value: false,
    variant: "new",
  },
  {
    key: "enterprise_id",
    label: "Enterprise ID",
    display_value: true,
    variant: "new",
  },
  {
    key: "account_id",
    label: "Account ID",
    display_value: true,
    variant: "new",
  },
  {
    key: "lead_id",
    label: "Lead ID",
    display_value: true,
    variant: "new",
  },
];
