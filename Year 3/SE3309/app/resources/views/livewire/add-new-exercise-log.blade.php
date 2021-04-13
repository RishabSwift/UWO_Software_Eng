<div>

    @include('layouts.errors')

    <form x-data="{ exercise_type: '{{ $exercise_type }}' }" wire:submit.prevent="log">
        <div class="row">
            <div class="col-2 px-4">
                <img src="{{ $image }}" class="img-fluid" alt="">
            </div>
            <div class="form-group col-9">
                <label for="exerciseName">Exercise Name</label>
                <select wire:model="name"
                        name="name"
                        id="exerciseName"
                        class="form-control">
                    @foreach (\App\Models\Exercise::getNames() as $name)
                        <option value="{{ $name }}">{{ $name }}</option>
                    @endforeach
                </select>
            </div>
            <fieldset class="form-group col-12">
                <label>Type of Exercise</label>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-check">
                            <input x-model="exercise_type" wire:model="exercise_type" class="form-check-input"
                                   type="radio"
                                   name="exercise_type"
                                   id="mood-radio"
                                   value="mood">
                            <label class="form-check-label" for="mood-radio">
                                Mood
                            </label>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-check">
                            <input x-model="exercise_type"
                                   wire:model="exercise_type"
                                   class="form-check-input"
                                   type="radio"
                                   name="exercise_type"
                                   id="weights-radio"
                                   value="weights">
                            <label class="form-check-label" for="weights-radio">
                                Weights
                            </label>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-check">
                            <input x-model="exercise_type" wire:model="exercise_type" class="form-check-input"
                                   type="radio"
                                   name="exerciseTypeRadios"
                                   id="cardio-radio"
                                   value="cardio">
                            <label class="form-check-label" for="cardio-radio">
                                Cardio
                            </label>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-check">
                            <input x-model="exercise_type"
                                   wire:model="exercise_type"
                                   class="form-check-input"
                                   type="radio"
                                   name="exerciseTypeRadios"
                                   id="stretch-radio"
                                   value="stretch">
                            <label class="form-check-label" for="stretch-radio">
                                Stretch
                            </label>
                        </div>
                    </div>
                </div>

            </fieldset>
            <div x-show="exercise_type === 'mood'" class="form-group col-md-4">
                <label for="mood_scale">Mood Scale (1-10)</label>
                <input wire:model="mood_scale"
                       type="number"
                       class="form-control"
                       id="mood_scale"
                       name="mood_scale"
                       min="0"
                       max="10">
            </div>


            <div x-show="exercise_type === 'weights'" class="form-group col-md-4">
                <label for="current_weight">Your Current Weight (lb)</label>
                <input wire:model="current_weight"
                       type="number"
                       class="form-control"
                       id="current_weight"
                       name="current_weight"
                       min="0"
                >
            </div>
            <div x-show="exercise_type === 'weights'" class="form-group col-md-4">
                <label for="weights_used">Weights Used (lb)</label>
                <input wire:model="weights_used"
                       type="number"
                       class="form-control"
                       id="weights_used"
                       name="weights_used"
                       min="1"
                      >
            </div>

            <div x-show="exercise_type === 'cardio'" class="form-group col-md-4">
                <label for="heart_rate">Heart Rate</label>
                <input wire:model="heart_rate"
                       type="number"
                       class="form-control"
                       id="heart_rate"
                       name="heart_rate"
                       min="0"
                       max="200">
            </div>
            <div x-show="exercise_type === 'cardio'" class="form-group col-md-4">
                <label for="distance">Distance Ran (meters)</label>
                <input wire:model="distance"
                       type="number"
                       class="form-control"
                       id="distance"
                       name="distance"
                       min="0">
            </div>

            <div x-show="exercise_type === 'cardio'" class="form-group col-md-4">
                <label for="time">Time (minutes)</label>
                <input wire:model="time"
                       type="number"
                       class="form-control"
                       id="time"
                       name="time"
                       min="0">
            </div>


            <div x-show="exercise_type === 'stretch'" class="form-group col-md-4">
                <label for="tightness">Tightness Scale (1-10)</label>
                <input wire:model="tightness"
                       type="number"
                       class="form-control"
                       id="tightness"
                       name="tightness"
                       min="0"
                       max="10">
            </div>
            <div x-show="exercise_type === 'stretch'" class="form-group col-md-4">
                <label for="mobility">Mobility Scale (1-10)</label>
                <input wire:model="mobility"
                       type="number"
                       class="form-control"
                       id="mobility"
                       name="mobility"
                       min="0"
                       max="10">
            </div>


            <div class="col-sm-10">
                <button id="submitLog" type="submit" class="btn btn-primary">
                    <i class="fe fe-check"></i>
                    Save Log</button>
            </div>
        </div>
    </form>
</div>
