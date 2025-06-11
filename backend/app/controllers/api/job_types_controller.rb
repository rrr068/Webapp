class Api::JobTypesController < ApplicationController
  def index
    @job_types = JobType.all
    render json: @job_types
  end
end
