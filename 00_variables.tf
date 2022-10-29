/*  template variables.tf
    used for required or optional vasriables run at runtime

    using terraform workspaces, variables should be configured for each
    environment in dev.tfvars, stg.tfvars or prd.tfvars

    for manual incvocation use --var-file-./your.tfvars for terraform
    for devops invocastion this is done for you
*/