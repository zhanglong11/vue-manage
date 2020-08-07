import Layout from '@/layout'

export default {
  path: '/safe',
  name: 'Safe',
  component: Layout,
  redirect: '/safe/organization/system',
  meta: { title: '安全管理', icon: 'el-icon-umbrella' },
  children: [
    {
      path: 'organization',
      name: 'SafeOrganization',
      alwaysShow: true,
      component: () => import('@/views/safe-kaifashang/organization'),
      meta: { title: '安全组织管理' },
      children: [
        {
          path: 'system',
          name: 'SafeOrganizationSystem',
          component: () => import('@/views/safe-kaifashang/organization/system'),
          meta: { title: '安全管理制度' }
        },
        {
          path: 'systemEdit',
          name: 'SafeOrganizationSystemAdd',
          meta: { title: '新建', activeMenu: '/safe/organization/system' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/organization/system/edit')
        },
        {
          path: 'systemEdit/:id',
          name: 'SafeOrganizationSystemEdit',
          meta: { title: '编辑', activeMenu: '/safe/organization/system' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/organization/system/edit')
        },
        {
          path: 'systemDetail/:id',
          name: 'SafeOrganizationSystemDetail',
          meta: { title: '详情', activeMenu: '/safe/organization/system' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/organization/system/detail')
        }
      ]
    },
    {
      path: 'safePlan',
      name: 'SafePlanManage',
      component: () => import('@/views/safe-kaifashang/plan'),
      meta: { title: '安全计划管理' },
      children: [
        {
          path: 'target',
          name: 'SafePlanTarget',
          component: () => import('@/views/safe-kaifashang/plan/target'),
          meta: { title: '安全目标管理' }
        },
        {
          path: 'targetEdit',
          name: 'SafePlanTargetAdd',
          meta: { title: '新建', activeMenu: '/safe/safePlan/target' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/target/edit')
        },
        {
          path: 'targetEdit/:id',
          name: 'SafePlanTargetEdit',
          meta: { title: '编辑', activeMenu: '/safe/safePlan/target' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/target/edit')
        },
        {
          path: 'targetDetail/:id',
          name: 'SafePlanTargetDetail',
          meta: { title: '详情', activeMenu: '/safe/safePlan/target' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/target/detail')
        },
        {
          path: 'culture',
          name: 'SafePlanCulture',
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/culture'),
          meta: { title: '安全文明管理目标' }
        },
        {
          path: 'cultureEdit',
          name: 'SafePlanCultureAdd',
          meta: { title: '新建', activeMenu: '/safe/safePlan/culture' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/culture/edit')
        },
        {
          path: 'cultureEdit/:id',
          name: 'SafePlanCultureEdit',
          meta: { title: '编辑', activeMenu: '/safe/safePlan/culture' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/culture/edit')
        },
        {
          path: 'cultureDetail/:id',
          name: 'SafePlanCultureDetail',
          meta: { title: '详情', activeMenu: '/safe/safePlan/culture' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/culture/detail')
        },
        {
          path: 'safePlan',
          name: 'SafePlan',
          component: () => import('@/views/safe-kaifashang/plan/plan'),
          meta: { title: '安全计划' }
        },
        {
          path: 'safePlanEdit',
          name: 'SafePlanSafePlanAdd',
          meta: { title: '新建', activeMenu: '/safe/safePlan/safePlan' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/plan/edit')
        },
        {
          path: 'safePlanEdit/:id',
          name: 'SafePlanSafePlanEdit',
          meta: { title: '编辑', activeMenu: '/safe/safePlan/safePlan' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/plan/edit')
        },
        {
          path: 'safePlanDetail/:id',
          name: 'SafePlanSafePlanDetail',
          meta: { title: '详情', activeMenu: '/safe/safePlan/safePlan' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/plan/detail')
        },
        {
          path: 'dangerous',
          name: 'SafePlanDangerous',
          component: () => import('@/views/safe-kaifashang/plan/dangerous'),
          meta: { title: '危险源台账' }
        },
        {
          path: 'dangerousEdit',
          name: 'SafePlanDangerousAdd',
          meta: { title: '新建', activeMenu: '/safe/safePlan/dangerous' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/dangerous/edit')
        },
        {
          path: 'dangerousEdit/:id',
          name: 'SafePlanDangerousEdit',
          meta: { title: '编辑', activeMenu: '/safe/safePlan/dangerous' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/dangerous/edit')
        },
        {
          path: 'dangerousDetail/:id',
          name: 'SafePlanDangerousDetail',
          meta: { title: '详情', activeMenu: '/safe/safePlan/dangerous' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/dangerous/detail')
        }
      ]
    },
    {
      path: 'process',
      name: 'Process',
      component: () => import('@/views/safe-kaifashang/process'),
      meta: { title: '安全过程管理' },
      children: [
        {
          path: 'processCheck',
          name: 'SafeProcessCheck',
          component: () => import('@/views/safe-kaifashang/process/check'),
          meta: { title: '安全检查' }
        },
        {
          path: 'processCheck/add',
          name: 'SafeProcessCheckAdd',
          meta: { title: '新建安全巡检', activeMenu: '/safe/process/processCheck' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/check/edit')
        },
        {
          path: 'processCheckfixed/add',
          name: 'SafeProcessCheckAddFixed',
          meta: { title: '新建安全定点巡视', activeMenu: '/safe/process/processCheck' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/check/edit')
        },
        {
          path: 'processCheck/:id',
          name: 'SafeProcessCheckEdit',
          meta: { title: '编辑', activeMenu: '/safe/process/processCheck' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/check/edit')
        },
        {
          path: 'processCheck/:id/view',
          name: 'SafeProcessCheckDetail',
          meta: { title: '详情', activeMenu: '/safe/process/processCheck' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/check/detail')
        },
        /* {
          path: 'cultureCheck',
          name: 'SafeProcessCultureCheck',
          component: () => import('@/views/safe-kaifashang/process/cultureCheck'),
          meta: { title: '安全文明检查' }
        },
        {
          path: 'cultureCheckEdit',
          name: 'SafeProcessCultureCheckEdit',
          meta: { title: '编辑', activeMenu: '/safe/process/cultureCheck' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/cultureCheck/edit')
        },
        {
          path: 'cultureCheckDetail',
          name: 'SafeProcessCultureCheckDetail',
          meta: { title: '详情', activeMenu: '/safe/process/cultureCheck' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/cultureCheck/detail')
        },
        {
          path: 'cultureTidy',
          name: 'SafeProcessCultureTidy',
          component: () => import('@/views/safe-kaifashang/process/cultureTidy'),
          meta: { title: '安全文明整改' }
        },
        {
          path: 'cultureTidyEdit',
          name: 'SafeProcessCultureTidyEdit',
          meta: { title: '编辑', activeMenu: '/safe/process/cultureTidy' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/cultureTidy/edit')
        },
        {
          path: 'cultureTidyDetail',
          name: 'SafeProcessCultureTidyDetail',
          meta: { title: '详情', activeMenu: '/safe/process/cultureTidy' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/cultureTidy/detail')
        },
        {
          path: 'cultureRecheck',
          name: 'SafeProcessCultureRecheck',
          component: () => import('@/views/safe-kaifashang/process/cultureRecheck'),
          meta: { title: '安全文明复检' }
        },
        {
          path: 'cultureRecheckEdit',
          name: 'SafeProcessCultureRecheckEdit',
          meta: { title: '编辑', activeMenu: '/safe/process/cultureRecheck' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/cultureRecheck/edit')
        },
        {
          path: 'cultureRecheckDetail',
          name: 'SafeProcessCultureRecheckDetail',
          meta: { title: '详情', activeMenu: '/safe/process/cultureRecheck' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/cultureRecheck/detail')
        },*/
        {
          path: 'accident',
          name: 'SafeProcessAccident',
          component: () => import('@/views/safe-kaifashang/process/accident'),
          meta: { title: '事故及处理' }
        },
        {
          path: 'accidentEdit',
          name: 'SafeProcessAccidentAdd',
          meta: { title: '新建', activeMenu: '/safe/process/accident' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/accident/edit')
        },
        {
          path: 'accidentEdit/:id',
          name: 'SafeProcessAccidentEdit',
          meta: { title: '编辑', activeMenu: '/safe/process/accident' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/accident/edit')
        },
        {
          path: 'accidentDetail/:id',
          name: 'SafeProcessAccidentDetail',
          meta: { title: '详情', activeMenu: '/safe/process/accident' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/accident/detail')
        },
        {
          path: 'log',
          name: 'SafeProcessLog',
          component: () => import('@/views/safe-kaifashang/process/log'),
          meta: { title: '安全日志' }
        },
        {
          path: 'logEdit',
          name: 'SafeProcessLogAdd',
          meta: { title: '新建', activeMenu: '/safe/process/log' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/log/edit')
        },
        {
          path: 'logEdit/:id',
          name: 'SafeProcessLogEdit',
          meta: { title: '编辑', activeMenu: '/safe/process/log' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/log/edit')
        },
        {
          path: 'logDetail/:id',
          name: 'SafeProcessLogDetail',
          meta: { title: '详情', activeMenu: '/safe/process/log' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/log/detail')
        },
        {
          path: 'safeToggle',
          name: 'SafeProcessToggle',
          component: () => import('@/views/safe-kaifashang/process/toggle'),
          meta: { title: '安全奖惩' }
        },
        {
          path: 'safeToggleEdit',
          name: 'SafeProcessToggleAdd',
          meta: { title: '新建', activeMenu: '/safe/process/safeToggle' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/toggle/edit')
        },
        {
          path: 'safeToggleEdit/:id',
          name: 'SafeProcessToggleEdit',
          meta: { title: '编辑', activeMenu: '/safe/process/safeToggle' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/toggle/edit')
        },
        {
          path: 'safeToggleDetail/:id',
          name: 'SafeProcessToggleDetail',
          meta: { title: '详情', activeMenu: '/safe/process/safeToggle' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/toggle/detail')
        },
        {
          path: 'safeAudit',
          name: 'SafeProcessAudit',
          component: () => import('@/views/safe-kaifashang/process/audit'),
          meta: { title: '安全考核' }
        },
        {
          path: 'safeAuditEdit',
          name: 'SafeProcessAuditAdd',
          meta: { title: '编辑', activeMenu: '/safe/process/safeAudit' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/audit/edit')
        },
        {
          path: 'safeAuditEdit/:id',
          name: 'SafeProcessAuditEdit',
          meta: { title: '编辑', activeMenu: '/safe/process/safeAudit' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/audit/edit')
        },
        {
          path: 'safeAuditDetail/:id',
          name: 'SafeProcessAuditDetail',
          meta: { title: '详情', activeMenu: '/safe/process/safeAudit' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/audit/detail')
        },
        {
          path: 'special',
          name: 'SafeProcessSpecial',
          component: () => import('@/views/safe-kaifashang/process/special'),
          meta: { title: '特种作业施工记录' }
        },
        {
          path: 'specialEdit',
          name: 'SafeProcessSpecialAdd',
          meta: { title: '新建', activeMenu: '/safe/process/special' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/special/edit')
        },
        {
          path: 'specialEdit/:id',
          name: 'SafeProcessSpecialEdit',
          meta: { title: '编辑', activeMenu: '/safe/process/special' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/special/edit')
        },
        {
          path: 'specialDetail/:id',
          name: 'SafeProcessSpecialDetail',
          meta: { title: '详情', activeMenu: '/safe/process/special' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/special/detail')
        }
      ]
    },
    {
      path: 'education',
      name: 'Education',
      component: () => import('@/views/safe-kaifashang/education'),
      meta: { title: '安全教育' },
      children: [
        {
          path: 'train',
          name: 'SafeEducationTrain',
          component: () => import('@/views/safe-kaifashang/education/train'),
          meta: { title: '安全培训' }
        },
        {
          path: 'trainEdit',
          name: 'SafeEducationTrainAdd',
          meta: { title: '新建', activeMenu: '/safe/education/train' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/education/train/edit')
        },
        {
          path: 'trainEdit/:id',
          name: 'SafeEducationTrainEdit',
          meta: { title: '编辑', activeMenu: '/safe/education/train' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/education/train/edit')
        },
        {
          path: 'trainDetail',
          name: 'SafeEducationTrainDetail',
          meta: { title: '详情', activeMenu: '/safe/education/train' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/education/train/detail')
        },
        {
          path: 'emergency',
          name: 'SafeEducationEmergency',
          component: () => import('@/views/safe-kaifashang/education/emergency'),
          meta: { title: '应急预案' }
        },
        {
          path: 'emergencyEdit',
          name: 'SafeEducationEmergencyAdd',
          meta: { title: '新建', activeMenu: '/safe/education/emergency' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/education/emergency/edit')
        },
        {
          path: 'emergencyEdit/:id',
          name: 'SafeEducationEmergencyEdit',
          meta: { title: '编辑', activeMenu: '/safe/education/emergency' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/education/emergency/edit')
        },
        {
          path: 'emergencyDetail',
          name: 'SafeEducationEmergencyDetail',
          meta: { title: '详情', activeMenu: '/safe/education/emergency' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/education/emergency/detail')
        },
        {
          path: 'library',
          name: 'SafeEducationLibrary',
          component: () => import('@/views/safe-kaifashang/education/library'),
          meta: { title: '知识文库' }
        },
        {
          path: 'libraryEdit',
          name: 'SafeEducationLibraryAdd',
          meta: { title: '新建', activeMenu: '/safe/education/library' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/education/library/edit')
        },
        {
          path: 'libraryEdit/:id',
          name: 'SafeEducationLibraryEdit',
          meta: { title: '编辑', activeMenu: '/safe/education/library' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/education/library/edit')
        },
        {
          path: 'libraryDetail',
          name: 'SafeEducationLibraryDetail',
          meta: { title: '详情', activeMenu: '/safe/education/library' },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/education/library/detail')
        }
      ]
    },
    {
      path: 'audit',
      name: 'safeAudit',
      hidden: true,
      component: () => import('@/views/safe-kaifashang/audit'),
      meta: { title: '审核' },
      children: [
        {
          path: 'manageSystem',
          name: 'manageSystem',
          component: () => import('@/views/safe-kaifashang/organization/system'),
          meta: { title: '安全管理制度审核', isAudit: true }
        },
        {
          path: 'manageSystemDetail/:id',
          name: 'ManageSystemApplyDetail',
          meta: { title: '审核', activeMenu: '/safe/audit/manageSystem', isAudit: true },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/organization/system/detail')
        },
        {
          path: 'targetManage',
          name: 'targetManage',
          component: () => import('@/views/safe-kaifashang/plan/target'),
          meta: { title: '安全目标管理审核', isAudit: true }
        },
        {
          path: 'targetManageDetail/:id',
          meta: { title: '审核', activeMenu: '/safe/audit/targetManage', isAudit: true },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/target/detail')
        },
        {
          path: 'cultureManage',
          name: 'cultureManage',
          component: () => import('@/views/safe-kaifashang/plan/culture'),
          meta: { title: '安全文明管理目标审核', isAudit: true }
        },
        {
          path: 'cultureManageDetail/:id',
          meta: { title: '审核', activeMenu: '/safe/audit/cultureManage', isAudit: true },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/culture/detail')
        },
        {
          path: 'auditSafePlan',
          name: 'auditSafePlan',
          component: () => import('@/views/safe-kaifashang/plan/plan'),
          meta: { title: '安全计划审核', isAudit: true }
        },
        {
          path: 'auditSafePlanDetail/:id',
          meta: { title: '审核', activeMenu: '/safe/audit/auditSafePlan', isAudit: true },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/plan/detail')
        },
        {
          path: 'auditDangerous',
          name: 'auditDangerous',
          component: () => import('@/views/safe-kaifashang/plan/dangerous'),
          meta: { title: '危险源台账审核', isAudit: true }
        },
        {
          path: 'auditDangerousDetail/:id',
          meta: { title: '审核', activeMenu: '/safe/audit/auditDangerous', isAudit: true },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/plan/dangerous/detail')
        },
        // {
        //   path: 'auditTidy',
        //   name: 'auditTidy',
        //   component: () => import('@/views/safe-kaifashang/audit/tidy'),
        //   meta: { title: '安全整改审核' }
        // },
        // {
        //   path: 'auditTidyDetail',
        //   meta: { title: '详情', activeMenu: '/safe/audit/auditTidy' },
        //   hidden: true,
        //   component: () => import('@/views/safe-kaifashang/audit/tidy/detail')
        // },
        {
          path: 'auditLog',
          name: 'auditLog',
          component: () => import('@/views/safe-kaifashang/process/log'),
          meta: { title: '安全日志审核', isAudit: true }
        },
        {
          path: 'auditLogDetail/:id',
          meta: { title: '审核', activeMenu: '/safe/audit/auditLog', isAudit: true },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/log/detail')
        },
        {
          path: 'auditAssess',
          name: 'auditAssess',
          component: () => import('@/views/safe-kaifashang/process/audit'),
          meta: { title: '安全考核审核', isAudit: true }
        },
        {
          path: 'auditAssessDetail/:id',
          meta: { title: '审核', activeMenu: '/safe/audit/auditAssess', isAudit: true },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/audit/detail')
        },
        {
          path: 'auditToggle',
          name: 'auditToggle',
          component: () => import('@/views/safe-kaifashang/process/toggle'),
          meta: { title: '安全奖惩审核', isAudit: true }
        },
        {
          path: 'auditToggleDetail/:id',
          meta: { title: '审核', activeMenu: '/safe/audit/auditToggle', isAudit: true },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/toggle/detail')
        },
        {
          path: 'auditSpecial',
          name: 'auditSpecial',
          component: () => import('@/views/safe-kaifashang/process/special'),
          meta: { title: '特种作业施工记录审核', isAudit: true }
        },
        {
          path: 'auditSpecialDetail/:id',
          meta: { title: '审核', activeMenu: '/safe/audit/auditSpecial', isAudit: true },
          hidden: true,
          component: () => import('@/views/safe-kaifashang/process/special/detail')
        }
      ]
    }
  ]
}
