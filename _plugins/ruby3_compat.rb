# Compatibility fix for Ruby 3.2+ and Ruby 4.0+
# Ruby 3.2 removed Object#tainted?, Object#taint, and Object#untaint, which older Liquid 4.0.x calls.

unless Object.method_defined?(:tainted?)
  class Object
    def tainted?
      false
    end

    def taint
      self
    end

    def untaint
      self
    end
  end
end
