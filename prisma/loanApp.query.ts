/* Centralised “include” so Product fields never go missing */
export const loanAppInclude = {
    product: {
      select: {
        name          : true,
        images        : true,
        annualRatePct : true,
        termMonths    : true,
        currency      : true,
      },
    },
  } as const;
  