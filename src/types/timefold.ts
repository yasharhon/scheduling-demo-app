export interface JobCreationResponse {
  id: string
  parentId: any
  originId: string
  name: string
  submitDateTime: string
  startDateTime: any
  activeDateTime: any
  completeDateTime: any
  shutdownDateTime: any
  solverStatus: string
  score: any
  tags: string[]
  validationResult: any
}

export interface Root {
  config: Config
  modelInput: ModelInput
}

export interface Config {
  run: Run
  model: Model
  resourcesConfiguration: ResourcesConfiguration
  mapsConfiguration: MapsConfiguration
}

export interface PostRoot {
  config: Config
  modelInput: ModelInput
}

export interface PostConfig {
  run: Run
  model: Model
}

export interface Run {
  name: string
  termination: Termination
  maxThreadCount: number
  tags: string[]
}

export interface Termination {
  spentLimit: string
  unimprovedSpentLimit: string
  stepCountLimit: number
}

export interface Model {
  overrides: Overrides
}

export interface Overrides {
  maxSoftShiftEndTimeWeight: number
  maxSoftLastVisitDepartureTimeWeight: number
  maxSoftShiftTravelTimeWeight: number
  minimizeTravelTimeWeight: number
  minimizeTravelDistanceWeight: number
  preferVisitsScheduledToEarliestDayWeight: number
  preferSchedulingOptionalVisitsWeight: number
  minimizeVisitCompletionRiskWeight: number
  minimizeUnnecessarySkillsWeight: number
  balanceTimeUtilizationWeight: number
  preferVisitVehicleMatchPreferredVehiclesWeight: number
  minimizeShiftCostsWeight: number
  maximizeTechnicianRatingWeight: number
  latestSlaEndTimeWeight: number
  visitCompletionRiskMinimalTimeToShiftEnd: string
  visitCompletionRiskMinimalPriority: string
  travelTimeAdjustment: TravelTimeAdjustment
  priorityWeights: PriorityWeight[]
  defaultTechnicianRating: number
}

export interface TravelTimeAdjustment {
  multiplier: number
  extraTime: string
}

export interface PriorityWeight {
  priority: string
  weight: number
}

export interface ResourcesConfiguration {
  memory: number
  labels: Labels
}

export interface Labels {
  additionalProp1: string
  additionalProp2: string
  additionalProp3: string
}

export interface MapsConfiguration {
  provider: string
  location: string
  maxDistanceFromRoad: number
  transportType: string
}

export interface ModelInput {
  locationSetName: string
  vehicles: Vehicle[]
  visits: Visit[]
  visitGroups: VisitGroup[]
  skills: string[]
  tags: Tag[]
  planningWindow: PlanningWindow
  freezeTime: string
  pinNextVisitDuringFreeze: string
}

export interface Vehicle {
  id: string
  vehicleType: string
  shifts: Shift[]
  historicalTimeUtilized: string
  historicalTimeCapacity: string
  technicianRating: number
  requiredArea: RequiredArea
}

export interface Shift {
  id: string
  startLocation: number[]
  endLocation: number[]
  minStartTime: string
  minFirstVisitArrivalTime: string
  maxSoftLastVisitDepartureTime: string
  maxLastVisitDepartureTime: string
  maxSoftEndTime: string
  maxEndTime: string
  maxTravelTimePerVisit: string
  maxTravelTime: string
  maxSoftTravelTime: string
  skills: Skill[]
  tags: string[]
  requiredBreaks: RequiredBreak[]
  temporarySkillSets: TemporarySkillSet[]
  temporaryTagSets: TemporaryTagSet[]
  movableOccupationRatioThreshold: number
  cost: Cost
  pinNextVisitDuringFreeze: string
  pinned: boolean
  itinerary: Itinerary[]
}

export interface Skill {
  name: string
  level: number
  multiplier: number
}

export interface RequiredBreak {
  id: string
  type: string
  location: number[]
  costImpact: string
  minStartTime?: string
  maxStartTime?: string
  maxEndTime?: string
  duration?: string
  startTime?: string
  endTime?: string
}

export interface TemporarySkillSet {
  start: string
  end: string
  skills: Skill2[]
}

export interface Skill2 {
  name: string
  level: number
  multiplier: number
}

export interface TemporaryTagSet {
  start: string
  end: string
  tags: string[]
}

export interface Cost {
  fixedCost: number
  rates: Rate[]
}

export interface Rate {
  duration: string
  activationCost: number
  costPerUnit: number
  unit: string
}

export interface Itinerary {
  id: string
  kind: string
}

export interface RequiredArea {
  type: string
  coordinates: number[][][]
}

export interface Visit {
  id: string
  name: string
  location: number[]
  timeWindows: TimeWindow[]
  serviceDuration: string
  serviceDurationBreakdown: ServiceDurationBreakdown[]
  requiredSkills: RequiredSkill[]
  requiredTags: string[]
  requiredVehicles: string[]
  prohibitedVehicles: string[]
  priority: string
  visitDependencies: VisitDependency[]
  pinningRequested: boolean
  minStartTravelTime: string
  preferredVehicles: string[]
  latestSlaEndTime: string
}

export interface TimeWindow {
  minStartTime: string
  maxStartTime: string
  maxEndTime: string
}

export interface ServiceDurationBreakdown {
  skill: string
  duration: string
}

export interface RequiredSkill {
  name: string
  minLevel: number
}

export interface VisitDependency {
  id: string
  precedingVisit: string
  minDelay: string
  minDelayTo: MinDelayTo
  coordination: string
}

export interface MinDelayTo {
  minStartDateAdjuster: string
  minStartDateAdjusterIncrement: number
  minStartTime: string
  timezone: string
}

export interface VisitGroup {
  id: string
  alignment: string
  serviceDurationStrategy: string
  visits: Visit2[]
}

export interface Visit2 {
  id: string
  name: string
  location: number[]
  timeWindows: TimeWindow2[]
  serviceDuration: string
  serviceDurationBreakdown: ServiceDurationBreakdown2[]
  requiredSkills: RequiredSkill2[]
  requiredTags: string[]
  requiredVehicles: string[]
  prohibitedVehicles: string[]
  priority: string
  visitDependencies: VisitDependency2[]
  pinningRequested: boolean
  minStartTravelTime: string
  preferredVehicles: string[]
  latestSlaEndTime: string
}

export interface TimeWindow2 {
  minStartTime: string
  maxStartTime: string
  maxEndTime: string
}

export interface ServiceDurationBreakdown2 {
  skill: string
  duration: string
}

export interface RequiredSkill2 {
  name: string
  minLevel: number
}

export interface VisitDependency2 {
  id: string
  precedingVisit: string
  minDelay: string
  minDelayTo: MinDelayTo2
  coordination: string
}

export interface MinDelayTo2 {
  minStartDateAdjuster: string
  minStartDateAdjusterIncrement: number
  minStartTime: string
  timezone: string
}

export interface Tag {
  name: string
}

export interface PlanningWindow {
  startDate: string
  endDate: string
}

export interface JobStatusResponse {
  metadata: Metadata
  modelOutput: ModelOutput
  inputMetrics: InputMetrics
  kpis: Kpis
}

export interface Metadata {
  id: string
  parentId: string
  originId: string
  name: string
  submitDateTime: string
  startDateTime: string
  activeDateTime: string
  completeDateTime: string
  shutdownDateTime: string
  solverStatus: string
  score: string
  tags: string[]
  validationResult: ValidationResult
  failureMessage: string
}

export interface ValidationResult {
  summary: string
  errors: string[]
  warnings: string[]
}

export interface ModelOutput {
  vehicles: OutputVehicle[]
  unassignedVisits: string[]
}

export interface OutputVehicle {
  id: string
  shifts: OutputShift[]
}

export interface OutputShift {
  id: string
  startTime: string
  pinned: boolean
  itinerary: Itinerary[]
  metrics: Metrics
}

export interface Itinerary {
  id: string
  kind: string
  arrivalTime?: string
  startServiceTime?: string
  departureTime?: string
  effectiveServiceDuration?: string
  travelTimeFromPreviousStandstill: string
  travelDistanceMetersFromPreviousStandstill: number
  minStartTravelTime?: string
  pinned?: boolean
  startTime?: string
  endTime?: string
}

export interface Metrics {
  totalTravelTime: string
  travelTimeFromStartLocationToFirstVisit: string
  travelTimeBetweenVisits: string
  travelTimeFromLastVisitToEndLocation: string
  totalTravelDistanceMeters: number
  travelDistanceFromStartLocationToFirstVisitMeters: number
  travelDistanceBetweenVisitsMeters: number
  travelDistanceFromLastVisitToEndLocationMeters: number
  endLocationArrivalTime: string
  technicianCosts: number
  overtime: string
}

export interface InputMetrics {
  visits: number
  visitGroups: number
  visitDependencies: number
  mandatoryVisits: number
  optionalVisits: number
  vehicles: number
  vehicleShifts: number
  visitsWithSla: number
  movableVisits: number
  pinnedVisits: number
}

export interface Kpis {
  totalTravelTime: string
  travelTimeFromStartLocationToFirstVisit: string
  travelTimeBetweenVisits: string
  travelTimeFromLastVisitToEndLocation: string
  totalTravelDistanceMeters: number
  travelDistanceFromStartLocationToFirstVisitMeters: number
  travelDistanceBetweenVisitsMeters: number
  travelDistanceFromLastVisitToEndLocationMeters: number
  totalUnassignedVisits: number
  totalAssignedVisits: number
  assignedMandatoryVisits: number
  assignedOptionalVisits: number
  totalActivatedVehicles: number
  workingTimeFairnessPercentage: number
  totalTechnicianCosts: number
  totalOvertime: string
  averageTechnicianRating: number
  percentageVisitsInSla: number
  absoluteVisitsInSla: number
}
